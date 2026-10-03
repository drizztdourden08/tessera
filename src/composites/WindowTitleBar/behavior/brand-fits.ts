/* @layer renderer-components @kind logic */
import { BRAND_CLEARANCE_PX, CONTROLS_SELECTOR, LOGO_SELECTOR, START_SELECTOR } from '../WindowTitleBar.constants';
import type { BrandFit } from '../WindowTitleBar.type';

const brandFits = (bar: HTMLElement, brand: HTMLElement): BrandFit => {
  const width = bar.clientWidth;
  const start = bar.querySelector<HTMLElement>(START_SELECTOR);
  const controls = bar.querySelector<HTMLElement>(CONTROLS_SELECTOR);
  const startEnd = start ? start.offsetLeft + start.offsetWidth : 0;
  const controlsWidth = controls ? width - controls.offsetLeft : 0;
  const sideRoom = width / 2 - Math.max(startEnd, controlsWidth) - BRAND_CLEARANCE_PX;
  if (brand.offsetWidth / 2 <= sideRoom) return 'full';
  const logo = brand.querySelector<HTMLElement>(LOGO_SELECTOR);
  return logo && logo.offsetWidth / 2 <= sideRoom ? 'logo' : 'none';
};

export { brandFits };
