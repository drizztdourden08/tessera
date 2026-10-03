/* @layer tooling-scripts @kind logic */
import { runUsage } from './run-usage.mjs';
import { AI_HELP } from './usage-help.constants.mjs';

const run = (argv, options) => runUsage(argv, options, { write: true, help: AI_HELP });

export { run };
