/* @layer tooling-scripts @kind logic */
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';
import { WHOLE_PIXELS_FROM } from './app-icons.constants.mjs';
import { crispAttr } from './art.mjs';

const SMOOTH = / shape-rendering="crispEdges"/g;

const render = (svg) => new Resvg(svg).render().asPng();

const nested = (art, box, crisp) =>
  `<svg x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" viewBox="${art.viewBox}"${crisp ? crispAttr(art) : ''}>${crisp ? art.body : art.body.replace(SMOOTH, '')}</svg>`;

const frame = (inner, w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

const crisp = (art, scale) => render(frame(nested(art, { x: 0, y: 0, w: art.w * scale, h: art.h * scale }, true), art.w * scale, art.h * scale));

const icon = (art, size) => {
  const whole = Math.floor(Math.min(size / art.w, size / art.h));
  const sharp = art.pixelArt && whole >= WHOLE_PIXELS_FROM;
  const fit = sharp ? whole : Math.min(size / art.w, size / art.h);
  const w = art.w * fit;
  const h = art.h * fit;
  const at = (edge) => (sharp ? Math.floor((size - edge) / 2) : (size - edge) / 2);
  return render(frame(nested(art, { x: at(w), y: at(h), w, h }, sharp), size, size));
};

const ico = (art, sizes) => pngToIco(sizes.map((size) => icon(art, size)));

export { crisp, ico, icon, render };
