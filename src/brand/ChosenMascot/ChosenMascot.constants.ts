/* @layer renderer-components @kind data */
import type { MascotName, MascotRegistry } from './ChosenMascot.type';

const MASCOTS: MascotRegistry = { sentri: 'rotp', flint: 'brock', pelago: 'archipelia' };

const MASCOT_NAMES: readonly [MascotName, ...MascotName[]] = ['sentri', 'flint', 'pelago'];

const PALETTE_ATTRIBUTE = 'data-palette';

export { MASCOT_NAMES, MASCOTS, PALETTE_ATTRIBUTE };
