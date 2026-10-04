/* @layer tooling-scripts @kind data */
const CHECK_HELP = `tessera check [options]

  Checks the usage file of every part in the parts folders of tessera.config.json:
  its fields, its alternatives, its place in the decision tree, its example and its propsHash.
  In report mode (guide.usage) it lists what it finds and passes; in enforce mode it fails on it.
  In the Tessera repo it runs pnpm guide --check.

Options:
  --verbose         also list the answers of the app tree that no part reaches
  -h, --help        this text
`;

const GUIDE_HELP = `tessera guide [options]

  Runs the same check, then writes the usage guide of the app to guide.out of tessera.config.json.
  In the Tessera repo it runs pnpm guide.

Options:
  --verbose         also list the answers of the app tree that no part reaches
  -h, --help        this text
`;

export { CHECK_HELP, GUIDE_HELP };
