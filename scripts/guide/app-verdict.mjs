/* @layer tooling-scripts @kind logic */
import { guideVerdict } from './guide-verdict.mjs';

const appVerdict = (findings, { mode, problem }) => ({
  problems: guideVerdict(findings, { mode, problem }).problems,
  failed: Boolean(problem) || (mode === 'enforce' && findings.length > 0),
});

export { appVerdict };
