/* @layer renderer-components @kind constants */
import type { AnimatedMascotBrand } from '../../AnimatedMascot/AnimatedMascot.type';

/**
 * Extras that must read the same way whichever way the mascot faces: letters, the laptop, the battery.
 * Each group turns back around the centre of its first member, so a battery and its cell stay together.
 * Everything else (pods, faces, sparkles, swooshes) mirrors with the rig.
 */
const UPRIGHT_EXTRAS: Readonly<Record<AnimatedMascotBrand, readonly (readonly string[])[]>> = {
  rotp: [['question'], ['exclaim'], ['zSmall'], ['zMid'], ['zBig'], ['laptop'], ['battery', 'batteryCell'], ['bulbOff', 'bulb', 'rays']],
  brock: [['question'], ['exclaim'], ['zSmall'], ['zMid'], ['zBig'], ['laptop'], ['battery'], ['bulb', 'bulbRays']],
  archipelia: [['question'], ['questionSmall'], ['exclaim'], ['zeeSmall'], ['zeeMid'], ['zeeBig'], ['laptop'], ['battery'], ['bulb', 'rays']],
};

const UPRIGHT_PREFIX = 'upright:';

export { UPRIGHT_EXTRAS, UPRIGHT_PREFIX };
