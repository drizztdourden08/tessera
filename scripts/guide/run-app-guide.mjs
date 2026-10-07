/* @layer tooling-scripts @kind logic */
import { appFiles } from './app-files.mjs';
import { appModel } from './app-model.mjs';
import { appPartsModules } from './app-parts-modules.mjs';
import { appVerdict } from './app-verdict.mjs';
import { collectApp } from './collect-app.mjs';
import { comparePartsModules } from './compare-parts-modules.mjs';
import { printFindings } from './print-findings.mjs';
import { APP_PRINT } from './print-words.constants.mjs';
import { writeGuide } from './write-guide.mjs';
import { writePartsModules } from './write-parts-modules.mjs';

const writeAppGuide = (model, log) => {
  const files = appFiles(model);
  const dir = model.app.outDir;
  const removed = writeGuide(model.config.root, files, `${dir}/components`);
  log(`tessera: wrote ${Object.keys(files).length} file(s) to ${dir}/${removed.length > 0 ? `, removed ${removed.join(', ')}` : ''}.`);
};

const writeParts = (root, parts, log) => {
  writePartsModules(root, parts);
  for (const path of Object.keys(parts)) log(`tessera: wrote the part names to ${path}.`);
};

const runAppGuide = async (config, { write, verbose, log = console.log }) => {
  const parts = appPartsModules(config);
  if (write) writeParts(config.root, parts, log);
  const model = appModel(await collectApp(config));
  if (write) writeAppGuide(model, log);
  const findings = write ? model.findings : [...model.findings, ...comparePartsModules(config.root, parts)];
  const failed = printFindings(findings, {
    mode: config.guide.usage, total: model.components.length, leafCount: model.leaves.length, verbose, words: APP_PRINT, verdict: appVerdict, log,
  });
  return failed ? 1 : 0;
};

export { runAppGuide };
