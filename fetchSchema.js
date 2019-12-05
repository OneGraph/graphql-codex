const fetch = require('node-fetch');

const {
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
} = require('graphql');

const fs = require('fs');

const yargs = require('yargs');

async function runIntrospectionQuery(url) {
  const body = JSON.stringify({query: getIntrospectionQuery()});
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body,
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(
      'Error running introspection query, errors=' +
        JSON.stringify(resp.errors),
    );
  } else {
    return json.data;
  }
}

function writeFile(path, content) {
  fs.writeFileSync(path, content);
}

async function main(config) {
  const schema = await runIntrospectionQuery(config.url);
  writeFile(config.path, JSON.stringify(schema, null, 2));
}

const argv = yargs
  .usage('Fetch GraphQL schema $0 --url <schema-url> --path <path>')
  .options({
    url: {
      describe: 'GraphQL API URL',
      demandOption: true,
      type: 'string',
      array: false,
    },
    path: {
      describe: 'Path to save schema.json',
      demandOption: true,
      type: 'string',
      array: false,
    },
  })
  .help().argv;

main(argv).catch(error => {
  console.error(String(error.stack || error));
  process.exit(1);
});
