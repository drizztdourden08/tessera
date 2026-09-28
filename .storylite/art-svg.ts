/* @layer root-config @kind logic */
import type { BrandMarkData, BrandMarkPath } from '../src/brand/brand.type';

const pathTag = (p: BrandMarkPath): string =>
  `<path fill="${p.ink}"${p.evenOdd ? ' fill-rule="evenodd"' : ''}${p.opacity === undefined ? '' : ` fill-opacity="${p.opacity}"`} d="${p.d}"/>`;

const artSvg = (art: BrandMarkData, height: string, className = '', label = ''): string => {
  const [, , w, h] = art.viewBox.split(' ').map(Number);
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="${art.viewBox}" height="${height}" style="aspect-ratio: ${w} / ${h}" ${a11y}${art.pixelArt ? ' shape-rendering="crispEdges"' : ''}>${art.paths.map(pathTag).join('')}</svg>`;
};

export { artSvg };
