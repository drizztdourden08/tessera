/* @layer renderer-components @kind data */
import type { MascotName, MascotRegistry } from './ChosenMascot.type';

const MASCOTS: MascotRegistry = { sentri: 'rotp' };

const MASCOT_NAMES: readonly [MascotName, ...MascotName[]] = ['sentri'];

const PALETTE_ATTRIBUTE = 'data-palette';

export { MASCOT_NAMES, MASCOTS, PALETTE_ATTRIBUTE };
