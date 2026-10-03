/* @layer tooling-scripts @kind logic */
import { checkUsage } from './check-usage.mjs';

const usageFindings = (components, context) =>
  components.filter((c) => c.usage).flatMap((c) => checkUsage(c.name, c.usage, { ...context, currentHash: c.propsHash }));

export { usageFindings };
