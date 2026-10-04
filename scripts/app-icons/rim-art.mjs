/* @layer tooling-scripts @kind logic */
const round = (value) => Number(value.toFixed(3));

const rimFraction = (rim, size) => Math.max(rim.ratio, rim.minPx / size);

const rimmedArt = (art, mark, colour, fraction) => {
  const exact = (fraction * Math.max(art.w, art.h)) / (1 - 2 * fraction);
  const pad = round(art.pixelArt ? Math.max(1, Math.round(exact)) : exact);
  const join = art.pixelArt ? 'miter' : 'round';
  const outline = mark.paths.map((p) => `<path d="${p.d}"/>`).join('');
  const x = round(art.x - pad);
  const y = round(art.y - pad);
  const w = round(art.w + pad * 2);
  const h = round(art.h + pad * 2);
  return {
    viewBox: `${x} ${y} ${w} ${h}`,
    x,
    y,
    w,
    h,
    pixelArt: art.pixelArt,
    body: `<g fill="none" stroke="${colour}" stroke-width="${round(pad * 2)}" stroke-linejoin="${join}">${outline}</g>${art.body}`,
  };
};

export { rimFraction, rimmedArt };
