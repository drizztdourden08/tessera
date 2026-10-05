/* @layer tooling-scripts @kind logic */
const WEIGHTS = [0.2126, 0.7152, 0.0722];

const linear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

const relativeLuminance = (rgb) => rgb.reduce((sum, c, i) => sum + WEIGHTS[i] * linear(c), 0);

export { relativeLuminance };
