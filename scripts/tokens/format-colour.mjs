/* @layer tooling-scripts @kind logic */
const byte = (c) => Math.round(Math.min(1, Math.max(0, c)) * 255);
const pair = (value) => value.toString(16).padStart(2, '0');

const formatColour = ({ rgb, alpha }) => {
  const opacity = byte(alpha);
  return `#${rgb.map(byte).map(pair).join('')}${opacity === 255 ? '' : pair(opacity)}`;
};

export { formatColour };
