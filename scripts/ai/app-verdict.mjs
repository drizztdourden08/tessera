/* @layer tooling-scripts @kind logic */
import { aiVerdict } from './ai-verdict.mjs';

const appVerdict = (findings, { mode, problem }) => ({
  problems: aiVerdict(findings, { mode, problem }).problems,
  failed: Boolean(problem) || (mode === 'enforce' && findings.length > 0),
});

export { appVerdict };
