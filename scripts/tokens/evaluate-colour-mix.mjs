/* @layer tooling-scripts @kind logic */
import { formatColour } from './format-colour.mjs';
import { mixColours } from './mix-colours.mjs';
import { parseColour } from './parse-colour.mjs';

const OPEN = 'color-mix(';

const topLevelParts = (text) => {
  const parts = [''];
  let depth = 0;
  for (const char of text) {
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (char === ',' && depth === 0) parts.push('');
    else parts[parts.length - 1] += char;
  }
  return parts.map((part) => part.trim());
};

const withShare = (part) => {
  const match = /^(.*?)\s+([\d.]+)%$/.exec(part);
  return match ? { colour: parseColour(match[1]), share: Number(match[2]) } : { colour: parseColour(part), share: null };
};

const mixOf = (args) => {
  const [method, ...colours] = topLevelParts(args);
  const space = /^in\s+(\w+)/.exec(method)?.[1];
  const [first, second] = colours.map(withShare);
  const p1 = first.share ?? (second.share === null ? 50 : 100 - second.share);
  const p2 = second.share ?? 100 - p1;
  const total = p1 + p2;
  const mixed = mixColours(space, first.colour, second.colour, p2 / total);
  return formatColour({ rgb: mixed.rgb, alpha: mixed.alpha * Math.min(1, total / 100) });
};

const closingParen = (text, from) => {
  let depth = 1;
  for (let i = from; i < text.length; i += 1) {
    if (text[i] === '(') depth += 1;
    if (text[i] === ')') depth -= 1;
    if (depth === 0) return i;
  }
  throw new Error(`unclosed color-mix in "${text}"`);
};

const evaluateColourMix = (value) => {
  let text = value;
  for (let at = text.lastIndexOf(OPEN); at !== -1; at = text.lastIndexOf(OPEN)) {
    const end = closingParen(text, at + OPEN.length);
    text = `${text.slice(0, at)}${mixOf(text.slice(at + OPEN.length, end))}${text.slice(end + 1)}`;
  }
  return text;
};

export { evaluateColourMix };
