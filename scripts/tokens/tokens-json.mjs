/* @layer tooling-scripts @kind logic */
import { formatColour } from './format-colour.mjs';
import { parseColour } from './parse-colour.mjs';
import { DEFAULT_PALETTE, THEME_COLOURS, THEME_SCALES } from './tokens.constants.mjs';

const opaque = (value, ground) => {
  const colour = parseColour(value);
  const under = parseColour(ground).rgb;
  return formatColour({ rgb: colour.rgb.map((c, i) => c * colour.alpha + under[i] * (1 - colour.alpha)), alpha: 1 });
};

const darkColours = (tokens) => {
  const ground = tokens.get(THEME_COLOURS.bg);
  return Object.fromEntries(Object.entries(THEME_COLOURS).map(([key, name]) => [key, opaque(tokens.get(name), ground)]));
};

const scale = (tokens, prefix) =>
  Object.fromEntries([...tokens].filter(([name]) => name.startsWith(prefix)).map(([name, value]) => [name.slice(prefix.length), value]));

const brandEntry = (gradient, gradientCss) => {
  const [from, via, to] = gradient.stops;
  return {
    gradient: to === undefined ? [from, via] : [from, to, via],
    angle: gradient.angle,
    stops: [...gradient.stops],
    css: gradientCss(gradient),
  };
};

const tokensJson = (resolved, { family, apps, gradientCss }) => {
  const base = resolved[DEFAULT_PALETTE];
  return {
    brands: Object.fromEntries(apps.map((app) => [app, brandEntry(family[app].gradient, gradientCss)])),
    theme: {
      dark: darkColours(base),
      ...Object.fromEntries(Object.entries(THEME_SCALES).map(([key, prefix]) => [key, scale(base, prefix)])),
    },
    palettes: Object.fromEntries(Object.entries(resolved).map(([palette, tokens]) => [palette, { dark: darkColours(tokens) }])),
  };
};

export { tokensJson };
