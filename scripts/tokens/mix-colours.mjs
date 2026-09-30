/* @layer tooling-scripts @kind logic */
import { colourSpace } from './colour-spaces.mjs';

const mixHue = (first, second, share) => {
  if (Number.isNaN(first)) return second;
  if (Number.isNaN(second)) return first;
  const step = ((second - first + 540) % 360) - 180;
  return (first + step * share + 360) % 360;
};

const mixColours = (spaceName, first, second, share) => {
  const space = colourSpace(spaceName);
  const [a, b] = [space.from(first.rgb), space.from(second.rgb)];
  const alpha = first.alpha * (1 - share) + second.alpha * share;
  const values = a.map((value, i) => {
    if (i === space.hue) return mixHue(value, b[i], share);
    const mixed = value * first.alpha * (1 - share) + b[i] * second.alpha * share;
    return alpha === 0 ? 0 : mixed / alpha;
  });
  return { rgb: space.to(values), alpha };
};

export { mixColours };
