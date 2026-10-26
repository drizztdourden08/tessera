/* @layer renderer-components @kind logic */
import { ANSI_RGB } from './ansi.constants';

const nearestAnsi = (r: number, g: number, b: number): number => {
  let best = 0;
  let bestDistance = Infinity;
  ANSI_RGB.forEach(([pr, pg, pb], index) => {
    const distance = (pr - r) ** 2 + (pg - g) ** 2 + (pb - b) ** 2;
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });
  return best;
};

export { nearestAnsi };
