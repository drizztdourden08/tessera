/* @layer stories @kind constants */
import type { AnimatedMascotBrand } from '../../../../src/brand/AnimatedMascot/AnimatedMascot.type';

const UPRIGHT_EXTRAS: Readonly<Record<AnimatedMascotBrand, readonly (readonly string[])[]>> = {
  rotp: [['question'], ['exclaim'], ['zSmall'], ['zMid'], ['zBig'], ['laptop'], ['battery', 'batteryCell'], ['bulbOff', 'bulb', 'rays']],
  brock: [['question'], ['exclaim'], ['zSmall'], ['zMid'], ['zBig'], ['laptop'], ['battery'], ['bulb', 'bulbRays']],
  archipelia: [['question'], ['questionSmall'], ['exclaim'], ['zeeSmall'], ['zeeMid'], ['zeeBig'], ['laptop'], ['battery'], ['bulb', 'rays']],
};

const UPRIGHT_PREFIX = 'upright:';

export { UPRIGHT_EXTRAS, UPRIGHT_PREFIX };
