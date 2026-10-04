/* @layer renderer-components @kind logic */
import type { MascotChoice, MascotName } from '../ChosenMascot.type';
import { mascotForBrand } from './mascot-for-brand';

const mascotFor = (choice: MascotChoice, brand?: string, palette?: string | null): MascotName | null => {
  if (choice !== 'auto') return choice;
  return mascotForBrand(brand) ?? mascotForBrand(palette);
};

export { mascotFor };
