/* @layer renderer-components @kind logic */
import type { BackdropGlow, BackdropGradient } from './backdrop-gradient.type';

const glowCss = ({ token, strength, at: [x, y], reach }: BackdropGlow): string =>
  `radial-gradient(ellipse at ${x}% ${y}%, color-mix(in srgb, var(${token}) ${strength}%, transparent), transparent ${reach}%)`;

const backdropGradientCss = ({ glows, angle, stops }: BackdropGradient): string =>
  [...glows.map(glowCss), `linear-gradient(${angle}deg, ${stops.map((stop) => `var(${stop})`).join(', ')})`].join(', ');

export { backdropGradientCss };
