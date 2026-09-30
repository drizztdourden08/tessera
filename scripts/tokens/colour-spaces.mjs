/* @layer tooling-scripts @kind logic */
const POWERLESS_HUE_CHROMA = 0.02;

const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);

const srgbToOklab = (rgb) => {
  const [r, g, b] = rgb.map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

const oklabToSrgb = ([lightness, a, b]) => {
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(toGamma);
};

const srgbToOklch = (rgb) => {
  const [l, a, b] = srgbToOklab(rgb);
  const chroma = Math.hypot(a, b);
  return [l, chroma, chroma <= POWERLESS_HUE_CHROMA ? Number.NaN : ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360];
};

const oklchToSrgb = ([l, chroma, hue]) => {
  const angle = ((Number.isNaN(hue) ? 0 : hue) * Math.PI) / 180;
  return oklabToSrgb([l, chroma * Math.cos(angle), chroma * Math.sin(angle)]);
};

const SPACES = {
  srgb: { from: (rgb) => [...rgb], to: (values) => values, hue: -1 },
  oklab: { from: srgbToOklab, to: oklabToSrgb, hue: -1 },
  oklch: { from: srgbToOklch, to: oklchToSrgb, hue: 2 },
};

const colourSpace = (name) => {
  const space = SPACES[name];
  if (!space) throw new Error(`color-mix space "${name}" is not handled`);
  return space;
};

export { colourSpace };
