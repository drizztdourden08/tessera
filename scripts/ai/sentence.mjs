/* @layer tooling-scripts @kind logic */
import { capital } from './capital.mjs';

const sentence = (text) => {
  const opened = capital(text.trim());
  return /[.?!]$/.test(opened) ? opened : `${opened}.`;
};

export { sentence };
