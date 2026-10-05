/* @layer tooling-scripts @kind logic */
const colourOver = ({ rgb, alpha }, ground) => rgb.map((c, i) => c * alpha + ground[i] * (1 - alpha));

export { colourOver };
