/* @layer stories @kind data */
import type { AnimatedMascotBrand, MascotName, MascotPose } from '../../../src/brand';

const MASCOT_POSES: Readonly<Record<string, MascotPose>> = {
  'At rest': {},
  'Looks left': { look: [-2, 0] },
  'Looks right': { look: [2, 0] },
  'Looks up': { look: [0, -1] },
  'Arms raised': { podAngles: { left: 25, right: -25 }, handAngles: { left: 45, right: -45 } },
  'Waving': { look: [1, 0], podAngles: { right: -75 }, handAngles: { right: -70 } },
};

const MASCOT_NAME_OF: Readonly<Record<AnimatedMascotBrand, MascotName>> = { rotp: 'sentri', brock: 'flint', archipelia: 'pelago' };

export { MASCOT_NAME_OF, MASCOT_POSES };
