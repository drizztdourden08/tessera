/* @layer tooling-scripts @kind data */
const CHECK_HELP = `tessera check [options]

  Checks the usage file of every part in the parts folders of tessera.config.json:
  its fields, its alternatives, its place in the decision tree, its example and its propsHash.
  In report mode (ai.usage) it lists what it finds and passes; in enforce mode it fails on it.
  In the Tessera repo it runs pnpm ai --check.

Options:
  --verbose         also list the answers of the app tree that no part reaches
  -h, --help        this text
`;

const AI_HELP = `tessera ai [options]

  Runs the same check, then writes the ai/ guide of the app to ai.out of tessera.config.json.
  In the Tessera repo it runs pnpm ai.

Options:
  --verbose         also list the answers of the app tree that no part reaches
  -h, --help        this text
`;

export { AI_HELP, CHECK_HELP };
