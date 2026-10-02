/* @layer tooling-scripts @kind data */
const COMMANDS = {
  new: () => import('./new-command.mjs'),
};

const USAGE = `tessera <command>

Commands:
  new <kind> <Name>   create a component: kind is primitive, composite, compound or view
                      (tessera new --help lists its options)

Options:
  -h, --help          this text
  -v, --version       the Tessera version
`;

export { COMMANDS, USAGE };
