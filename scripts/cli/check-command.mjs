/* @layer tooling-scripts @kind logic */
import { runUsage } from './run-usage.mjs';
import { CHECK_HELP } from './usage-help.constants.mjs';

const run = (argv, options) => runUsage(argv, options, { write: false, help: CHECK_HELP });

export { run };
