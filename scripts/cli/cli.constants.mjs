/* @layer tooling-scripts @kind data */
const COMMANDS = {
  new: () => import('./new-command.mjs'),
  check: () => import('./check-command.mjs'),
  ai: () => import('./ai-command.mjs'),
};

const USAGE = `tessera <command>

Commands:
  new <kind> <Name>   create a component: kind is primitive, composite, compound or view
                      (tessera new --help lists its options)
  check               check the usage file of every part of the app
  ai                  check them, then write the ai/ guide of the app

Options:
  -h, --help          this text
  -v, --version       the Tessera version
`;

export { COMMANDS, USAGE };
