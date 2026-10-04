/* @layer renderer-components @kind logic */
import { MASCOT_NAMES, MASCOTS } from '../ChosenMascot.constants';
import type { MascotName } from '../ChosenMascot.type';

const mascotForBrand = (brand: string | null | undefined): MascotName | null =>
  MASCOT_NAMES.find((name) => MASCOTS[name] === brand) ?? null;

export { mascotForBrand };
