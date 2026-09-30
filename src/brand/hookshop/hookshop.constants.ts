/* @layer renderer-components @kind data */
import type { ScenePoint } from '../brand.type';

const DEG = 180 / Math.PI;
const ORIGIN: ScenePoint = [0, 0];
const CHAIN_SAMPLES = 240;
const SEARCH_STEPS = 40;

export { CHAIN_SAMPLES, DEG, ORIGIN, SEARCH_STEPS };
