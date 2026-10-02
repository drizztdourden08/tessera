/* @layer tooling-scripts @kind entry */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { aiFiles } from './ai-files.mjs';
import { aiMode } from './ai-mode.mjs';
import { collectAi } from './collect-ai.mjs';
import { compareAi } from './compare-ai.mjs';
import { printFindings } from './print-findings.mjs';
import { slashed } from './slashed.mjs';
import { writeAi } from './write-ai.mjs';

const ROOT = slashed(join(dirname(fileURLToPath(import.meta.url)), '..', '..'));
const args = process.argv.slice(2);
const check = args.includes('--check');

const model = await collectAi(ROOT);
const files = aiFiles(model);
const findings = [...model.findings];
if (check) findings.push(...compareAi(ROOT, files));
else {
  const removed = writeAi(ROOT, files);
  console.log(`ai: wrote ${Object.keys(files).length} file(s) to ai/${removed.length > 0 ? `, removed ${removed.join(', ')}` : ''}.`);
}
const failed = printFindings(findings, {
  ...aiMode(ROOT),
  total: model.components.length,
  leafCount: model.leaves.length,
  verbose: args.includes('--verbose'),
});
if (check && !findings.some((f) => f.kind === 'drift')) console.log('ai: ai/ matches what pnpm ai writes.');
process.exitCode = failed ? 1 : 0;
