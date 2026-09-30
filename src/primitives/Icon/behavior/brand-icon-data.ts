/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import { BRAND_FAMILY } from '../../../brand/family.constants';
import { sceneMarkup } from '../../../brand/scene/scene-markup';
import type { BrandMarkPath } from '../../../brand/brand.type';
import type { BrandIconName, BrandIconTone } from '../Icon.type';

const pathTag = (path: BrandMarkPath, tone: BrandIconTone, crisp: boolean): string => {
  const fill = tone === 'mono' ? 'currentColor' : path.ink;
  const rule = path.evenOdd ? ' fill-rule="evenodd"' : '';
  const opacity = path.opacity === undefined ? '' : ` fill-opacity="${path.opacity}"`;
  const edges = crisp ? ' shape-rendering="crispEdges"' : '';
  return `<path fill="${fill}"${rule}${opacity}${edges} d="${path.d}"/>`;
};

const mascotIconData = (tone: BrandIconTone): IconifyIcon | null => {
  const mascot = BRAND_FAMILY.rotp.mascot;
  if (!mascot) return null;
  const scene = mascot.variants[0].compose();
  const ink = tone === 'mono' ? () => 'currentColor' : undefined;
  return { body: sceneMarkup(scene, { idPrefix: 'rotp-mascot', ink }), left: 0, top: 0, width: scene.width, height: scene.height };
};

const brandIconData = (name: BrandIconName, tone: BrandIconTone): IconifyIcon => {
  const mascot = name === 'rotp-mascot' ? mascotIconData(tone) : null;
  if (mascot) return mascot;
  const art = name === 'rotp-mascot' ? BRAND_FAMILY.tessera.mark : BRAND_FAMILY[name].mark;
  const [left = 0, top = 0, width = 16, height = 16] = art.viewBox.split(' ').map(Number);
  const body = art.paths.map((path) => pathTag(path, tone, art.pixelArt === true)).join('');
  return { body, left, top, width, height };
};

export { brandIconData };
