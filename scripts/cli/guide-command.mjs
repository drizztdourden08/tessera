/* @layer tooling-scripts @kind logic */
import { runUsage } from './run-usage.mjs';
import { GUIDE_HELP } from './usage-help.constants.mjs';

const run = (argv, options) => runUsage(argv, options, { write: true, help: GUIDE_HELP });

export { run };
