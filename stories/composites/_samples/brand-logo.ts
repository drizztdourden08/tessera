/* @layer stories @kind data */
import { BRAND_FAMILY } from '../../../src/brand';
import type { BrandApp } from '../../../src/brand';

const pathTag = (d: string, ink: string, evenOdd?: boolean): string =>
  `<path fill="${ink}"${evenOdd === true ? ' fill-rule="evenodd"' : ''} d="${d}"/>`;

const brandLogoUri = (app: BrandApp): string => {
  const { viewBox, paths, pixelArt } = BRAND_FAMILY[app].mark;
  const crisp = pixelArt === true ? ' shape-rendering="crispEdges"' : '';
  const body = paths.map((path) => pathTag(path.d, path.ink, path.evenOdd)).join('');
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${crisp}>${body}</svg>`)}`;
};

export { brandLogoUri };
