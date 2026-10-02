/* @layer tooling-scripts @kind logic */
import { GLOB_CHARS } from './config.constants.mjs';

const isGlob = (path) => GLOB_CHARS.test(path);

export { isGlob };
