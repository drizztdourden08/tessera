/* @layer tooling-scripts @kind logic */
const byte = (c) => Math.round(Math.min(1, Math.max(0, c)) * 255);
const pair = (value) => value.toString(16).padStart(2, '0');
const SHORTENABLE = /^#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3(?:([0-9a-f])\4)?$/;

const shortHex = (hex) => {
  const match = SHORTENABLE.exec(hex);
  return match ? `#${match.slice(1, 4).join('')}${match[4] ?? ''}` : hex;
};

const formatColour = ({ rgb, alpha }) => {
  const opacity = byte(alpha);
  return shortHex(`#${rgb.map(byte).map(pair).join('')}${opacity === 255 ? '' : pair(opacity)}`);
};

export { formatColour };
