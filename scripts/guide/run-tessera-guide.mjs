/* @layer tooling-scripts @kind logic */
import { guideFiles } from './guide-files.mjs';
import { guideMode } from './guide-mode.mjs';
import { collectGuide } from './collect-guide.mjs';
import { compareGuide } from './compare-guide.mjs';
import { printFindings } from './print-findings.mjs';
import { writeGuide } from './write-guide.mjs';

const runTesseraGuide = async (root, { check, verbose, log = console.log }) => {
  const model = await collectGuide(root);
  const files = guideFiles(model);
  const findings = [...model.findings];
  if (check) findings.push(...compareGuide(root, files));
  else {
    const removed = writeGuide(root, files);
    log(`guide: wrote ${Object.keys(files).length} file(s) to guide/${removed.length > 0 ? `, removed ${removed.join(', ')}` : ''}.`);
  }
  const failed = printFindings(findings, { ...guideMode(root), total: model.components.length, leafCount: model.leaves.length, verbose, log });
  if (check && !findings.some((f) => f.kind === 'drift')) log('guide: guide/ matches what pnpm guide writes.');
  return failed ? 1 : 0;
};

export { runTesseraGuide };
