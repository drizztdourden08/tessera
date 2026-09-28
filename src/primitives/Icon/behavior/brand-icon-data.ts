/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import { BRAND_FAMILY } from '../../../brand/family.constants';
import type { BrandMarkData, BrandMarkPath } from '../../../brand/brand.type';
import type { BrandIconName, BrandIconTone } from '../Icon.type';

const artFor = (name: BrandIconName): BrandMarkData | undefined =>
  name === 'rotp-mascot' ? BRAND_FAMILY.rotp.mascot : BRAND_FAMILY[name].mark;

const pathTag = (path: BrandMarkPath, tone: BrandIconTone, crisp: boolean): string => {
  const fill = tone === 'mono' ? 'currentColor' : path.ink;
  const rule = path.evenOdd ? ' fill-rule="evenodd"' : '';
  const opacity = path.opacity === undefined ? '' : ` fill-opacity="${path.opacity}"`;
  const edges = crisp ? ' shape-rendering="crispEdges"' : '';
  return `<path fill="${fill}"${rule}${opacity}${edges} d="${path.d}"/>`;
};

const brandIconData = (name: BrandIconName, tone: BrandIconTone): IconifyIcon => {
  const art = artFor(name) ?? BRAND_FAMILY.tessera.mark;
  const [left = 0, top = 0, width = 16, height = 16] = art.viewBox.split(' ').map(Number);
  const body = art.paths.map((path) => pathTag(path, tone, art.pixelArt === true)).join('');
  return { body, left, top, width, height };
};

export { brandIconData };
