/* @layer renderer-components @kind util */
import { SWATCH_SELECTOR } from '../SwatchGrid.constants';

const swatchOfKey = (list: HTMLElement | null, key: string): HTMLElement | undefined =>
  [...(list?.querySelectorAll<HTMLElement>(SWATCH_SELECTOR) ?? [])].find((swatch) => swatch.dataset.swatchKey === key);

export { swatchOfKey };
