/* @layer renderer-components @kind logic */
import { MASCOT_NAMES, MASCOTS } from '../ChosenMascot.constants';
import type { MascotChoice, MascotName } from '../ChosenMascot.type';

const mascotOfBrand = (brand: string | null | undefined): MascotName | undefined =>
  MASCOT_NAMES.find((name) => MASCOTS[name] === brand);

const mascotFor = (choice: MascotChoice, brand?: string, palette?: string | null): MascotName => {
  if (choice !== 'auto') return choice;
  return mascotOfBrand(brand) ?? mascotOfBrand(palette) ?? MASCOT_NAMES[0];
};

export { mascotFor };
