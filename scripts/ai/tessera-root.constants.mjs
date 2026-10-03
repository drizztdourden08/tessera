/* @layer tooling-scripts @kind data */
import { fileURLToPath } from 'node:url';
import { slashed } from './slashed.mjs';

const TESSERA_ROOT = slashed(fileURLToPath(new URL('../..', import.meta.url)));

export { TESSERA_ROOT };
