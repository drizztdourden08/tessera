/* @layer tooling-scripts @kind logic */
import { PREVIEW_SIZE } from './app-icons.constants.mjs';

const pathTag = (p) =>
  `<path fill="${p.ink}"${p.evenOdd ? ' fill-rule="evenodd"' : ''}${p.opacity === undefined ? '' : ` fill-opacity="${p.opacity}"`} d="${p.d}"/>`;

const boxOf = (viewBox) => {
  const [x, y, w, h] = viewBox.split(' ').map(Number);
  return { viewBox, x, y, w, h };
};

const markArt = (mark) => ({ ...boxOf(mark.viewBox), pixelArt: mark.pixelArt === true, body: mark.paths.map(pathTag).join('') });

const sceneArt = (scene, body) => ({ ...boxOf(`0 0 ${scene.width} ${scene.height}`), pixelArt: true, body });

const crispAttr = (art) => (art.pixelArt ? ' shape-rendering="crispEdges"' : '');

const artFile = (art, label) => {
  const long = Math.max(art.w, art.h);
  const width = Math.round((art.w / long) * PREVIEW_SIZE);
  const height = Math.round((art.h / long) * PREVIEW_SIZE);
  const lines = art.body.replace(/></g, '>\n<').split('\n').map((line) => `  ${line}`);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${art.viewBox}" width="${width}" height="${height}" role="img" aria-label="${label}"${crispAttr(art)}>`,
    `  <title>${label}</title>`,
    ...lines,
    '</svg>',
    '',
  ].join('\n');
};

export { artFile, crispAttr, markArt, sceneArt };
