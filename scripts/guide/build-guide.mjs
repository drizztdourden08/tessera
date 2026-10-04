/* @layer tooling-scripts @kind entry */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTesseraGuide } from './run-tessera-guide.mjs';
import { slashed } from './slashed.mjs';

const ROOT = slashed(join(dirname(fileURLToPath(import.meta.url)), '..', '..'));
const args = process.argv.slice(2);

process.exitCode = await runTesseraGuide(ROOT, { check: args.includes('--check'), verbose: args.includes('--verbose') });
