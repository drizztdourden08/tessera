/* @layer tooling-scripts @kind logic */
import { appFiles } from './app-files.mjs';
import { appModel } from './app-model.mjs';
import { appVerdict } from './app-verdict.mjs';
import { collectApp } from './collect-app.mjs';
import { printFindings } from './print-findings.mjs';
import { APP_PRINT } from './print-words.constants.mjs';
import { writeAi } from './write-ai.mjs';

const writeGuide = (model, log) => {
  const files = appFiles(model);
  const dir = model.app.outDir;
  const removed = writeAi(model.config.root, files, `${dir}/components`);
  log(`tessera: wrote ${Object.keys(files).length} file(s) to ${dir}/${removed.length > 0 ? `, removed ${removed.join(', ')}` : ''}.`);
};

const runAppAi = async (config, { write, verbose, log = console.log }) => {
  const model = appModel(await collectApp(config));
  if (write) writeGuide(model, log);
  const failed = printFindings(model.findings, {
    mode: config.ai.usage, total: model.components.length, leafCount: model.leaves.length, verbose, words: APP_PRINT, verdict: appVerdict, log,
  });
  return failed ? 1 : 0;
};

export { runAppAi };
