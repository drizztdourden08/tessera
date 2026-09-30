/* @layer tooling-scripts @kind logic */
const HEX = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

const pairsOf = (digits) => (digits.length <= 4 ? [...digits].map((d) => d + d) : digits.match(/../g));

const parseColour = (text) => {
  if (text === 'transparent') return { rgb: [0, 0, 0], alpha: 0 };
  const digits = HEX.exec(text)?.[1];
  if (!digits) throw new Error(`"${text}" is not a colour the token script reads`);
  const [r, g, b, a = 1] = pairsOf(digits).map((pair) => parseInt(pair, 16) / 255);
  return { rgb: [r, g, b], alpha: a };
};

export { parseColour };
