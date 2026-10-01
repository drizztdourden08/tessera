/* @layer renderer-components @kind logic */
import { BACKDROP_FALLOFF } from './backdrop-falloff.constants';
import type { BackdropGlow, BackdropGradient } from './backdrop-gradient.type';

const alphaHex = (share: number): string => Math.round(share * 255).toString(16).padStart(2, '0');

const glowCss = ({ colour, strength, at: [x, y], size: [width, height] }: BackdropGlow): string => {
  const stops = BACKDROP_FALLOFF.map(([at, share]) => `${colour}${alphaHex((strength / 100) * share)} ${at}%`);
  return `radial-gradient(${width}% ${height}% at ${x}% ${y}%, ${stops.join(', ')})`;
};

const backdropGradientCss = ({ glows, angle, stops }: BackdropGradient): string =>
  [...glows.map(glowCss), `linear-gradient(${angle}deg, ${stops.join(', ')})`].join(', ');

export { backdropGradientCss };
