/* @layer tooling-scripts @kind logic */
import { aiFiles } from './ai-files.mjs';
import { aiMode } from './ai-mode.mjs';
import { collectAi } from './collect-ai.mjs';
import { compareAi } from './compare-ai.mjs';
import { printFindings } from './print-findings.mjs';
import { writeAi } from './write-ai.mjs';

const runTesseraAi = async (root, { check, verbose, log = console.log }) => {
  const model = await collectAi(root);
  const files = aiFiles(model);
  const findings = [...model.findings];
  if (check) findings.push(...compareAi(root, files));
  else {
    const removed = writeAi(root, files);
    log(`ai: wrote ${Object.keys(files).length} file(s) to ai/${removed.length > 0 ? `, removed ${removed.join(', ')}` : ''}.`);
  }
  const failed = printFindings(findings, { ...aiMode(root), total: model.components.length, leafCount: model.leaves.length, verbose, log });
  if (check && !findings.some((f) => f.kind === 'drift')) log('ai: ai/ matches what pnpm ai writes.');
  return failed ? 1 : 0;
};

export { runTesseraAi };
