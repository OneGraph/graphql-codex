const fetch = require('node-fetch');

const {
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
} = require('graphql');

const fs = require('fs');

const yargs = require('yargs');

async function runIntrospectionQuery() {
  const body = JSON.stringify({query: getIntrospectionQuery()});
  const res = await fetch(
    'https://serve.onegraph.com/graphql?app_id=0b33e830-7cde-4b90-ad7e-2a39c57c0e11',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body,
    },
  );
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
  const schema = await runIntrospectionQuery();
  writeFile(config.path, JSON.stringify(schema, null, 2));
}

const argv = yargs
  .usage('Fetch OneGraph schema $0 --path <path>')
  .options({
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
