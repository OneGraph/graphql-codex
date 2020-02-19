const fs = require('fs');
const yargs = require('yargs');
const zlib = require('zlib');
const crypto = require('crypto');
const fetch = require('node-fetch');
const {resolve} = require('path');
const {readdir} = require('fs').promises;
const asyncPool = require('tiny-async-pool');
const requireAuth = require('firebase-tools/lib/requireAuth');
const api = require('firebase-tools/lib/api');

async function readdirRecursive(dir, prefix = '') {
  const dirents = await readdir(dir, {withFileTypes: true});
  const files = await Promise.all(
    dirents.map(dirent => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory()
        ? readdirRecursive(res, `${prefix}${dirent.name}/`)
        : {path: res, relativePath: `${prefix}${dirent.name}`};
    }),
  );
  return Array.prototype.concat(...files);
}

async function getAllFiles({versionName}) {
  const files = [];
  let hasNextPage = true;
  let nextPageToken = null;
  while (hasNextPage) {
    const versionRes = await api.request(
      'GET',
      `/v1beta1/${versionName}/files`,
      {
        auth: true,
        origin: api.hostingApiOrigin,
        query: nextPageToken
          ? {pageToken: nextPageToken, pageSize: 10000}
          : {pageSize: 10000},
      },
    );
    const body = versionRes.body;
    hasNextPage = body.nextPageToken ? true : false;
    nextPageToken = body.nextPageToken;
    files.push(...body.files);
  }
  return files;
}

async function uploadFile({uploadUrl, hash, path}) {
  const reqOpts = await api.addRequestHeaders({
    url: `${uploadUrl}/${hash}`,
  });
  const stream = fs.createReadStream(path).pipe(zlib.createGzip({level: 9}));
  const res = await fetch(reqOpts.url, {
    method: 'POST',
    headers: reqOpts.headers,
    body: stream,
  });
  if (!res.ok) {
    console.error('HTTP ERROR', res.status, res.statusText);
    throw new Error('Unexpected error while uploading file.');
  }
}

async function createFileHash(filePath) {
  const hasher = crypto.createHash('sha256');
  const gzipper = zlib.createGzip({level: 9});
  const zipstream = fs.createReadStream(filePath).pipe(gzipper);
  zipstream.pipe(hasher);

  return await new Promise(function(resolve, reject) {
    zipstream.on('end', function() {
      resolve(hasher.read().toString('hex'));
    });
    zipstream.on('error', function(e) {
      console.error('e', e);
      reject(e);
    });
  });
}

async function run({site, prefix, uploadDirectory, isDryRun, token}) {
  const filesToUpload = await readdirRecursive(uploadDirectory);
  await requireAuth(token ? {token} : {}, [
    'https://www.googleapis.com/auth/cloud-platform',
  ]);
  console.log('Determining latest release...');
  const releaseRes = await api.request(
    'GET',
    `/v1beta1/sites/${site}/releases`,
    {
      auth: true,
      origin: api.hostingApiOrigin,
    },
  );
  const releases = releaseRes.body.releases;
  // TODO: is this the latest released version?
  const latestVersion = releases[0].version;

  console.log('Getting files in latest version...');
  const files = await getAllFiles({versionName: latestVersion.name});
  const fileHashes = {};

  const pathPrefix = `/${prefix}/`;
  for (const file of files) {
    if (!file.path.startsWith(pathPrefix)) {
      fileHashes[file.path] = file.hash;
    }
  }
  console.log('Hashing files for upload...');
  const reverseHashLookup = {};
  await asyncPool(8, filesToUpload, async fileToUpload => {
    const firebaseFilePath = `${pathPrefix}${fileToUpload.relativePath}`;
    const hash = await createFileHash(fileToUpload.path);
    reverseHashLookup[hash] = {firebaseFilePath, path: fileToUpload.path};
    fileHashes[firebaseFilePath] = hash;
  });

  console.log('Creating new version...');
  const newVersionRes = await api.request(
    'POST',
    `/v1beta1/sites/${site}/versions`,
    {auth: true, origin: api.hostingApiOrigin},
  );
  const newVersion = newVersionRes.body.name;
  console.log('Sending file listing for new version...');
  const fileHashesKeys = Object.keys(fileHashes);
  const chunks = Math.ceil(fileHashesKeys.length / 15000);
  for (let i = 0; i < chunks; i++) {
    const chunkHashes = {};
    const chunkHashKeys = fileHashesKeys.slice(15000 * i, 15000 * (i + 1));
    console.log(
      'Sending chunk',
      i + 1,
      'of',
      chunks,
      'with',
      chunkHashKeys.length,
      'files',
    );
    for (const k of chunkHashKeys) {
      chunkHashes[k] = fileHashes[k];
    }
    const populateFilesRes = await api.request(
      'POST',
      `/v1beta1/${newVersion}:populateFiles`,
      {
        auth: true,
        origin: api.hostingApiOrigin,
        data: {files: chunkHashes},
      },
    );
    const uploadUrl = populateFilesRes.body.uploadUrl;
    const requiredUploads = populateFilesRes.body.uploadRequiredHashes || [];
    console.log('Uploading', requiredUploads.length, 'files');
    await asyncPool(256, requiredUploads, async hash => {
      const fileToUpload = reverseHashLookup[hash];
      if (!fileToUpload) {
        console.error(
          'ERROR: asked to upload hash',
          hash,
          'but the hash is not in the prefixed domian.',
        );
        process.exit(1);
      }
      await uploadFile({
        uploadUrl,
        hash,
        path: fileToUpload.path,
      });
    });
  }
  if (!isDryRun) {
    console.log('Finalizing new version...');
    await api.request('PATCH', `/v1beta1/${newVersion}?updateMask=status`, {
      origin: api.hostingApiOrigin,
      auth: true,
      data: {status: 'FINALIZED'},
    });
    console.log('Releasing new version...');
    await api.request(
      'POST',
      `/v1beta1/sites/${site}/releases?version_name=${newVersion}`,
      {
        auth: true,
        origin: api.hostingApiOrigin,
        data: {message: 'Deployed from graphql docs'},
      },
    );
  } else {
    console.log('Dry run only, Add `--commit` to deploy.');
    // Delete the version we just created, just to be nice
    console.log('Deleting new version...');
    await api.request('DELETE', `/v1beta1/${newVersion}`, {
      auth: true,
      origin: api.hostingApiOrigin,
    });
  }
}

function normalizePrefix(prefix) {
  let res = prefix;
  if (res.startsWith('/')) {
    res = res.substr(1);
  }
  if (res.endsWith('/')) {
    res = res.substr(0, res.length - 1);
  }
  return res;
}

const argv = yargs
  .usage(
    'Upload directory to firebase hosting $0 --project <project-name> --subpath <subpath> --directory <directory-to-upload> --token <ci-token> --commit',
  )
  .options({
    project: {
      describe: 'The name of the Firebase project',
      demandOption: true,
      type: 'string',
      array: false,
    },
    subpath: {
      describe:
        'The subpath that the directory should be deployed to (e.g. `schema` for `https://example.com/schema`',
      demandOption: true,
      type: 'string',
      array: false,
    },
    directory: {
      describe: 'The directory to upload',
      demandOption: true,
      type: 'string',
      array: false,
    },
    commit: {
      describe: 'If not set, does a dry run',
      demandOption: false,
      type: 'boolean',
      array: false,
    },
    token: {
      describe: 'Token to use to deploy',
      demandOption: false,
      type: 'string',
      array: false,
    },
  })
  .help().argv;

const site = argv.project;
const prefix = normalizePrefix(argv.subpath);
const uploadDirectory = argv.directory;
const isDryRun = argv.commit ? false : true;
run({site, prefix, uploadDirectory, isDryRun, token: argv.token});
