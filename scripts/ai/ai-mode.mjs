/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';
import { DEFAULT_MODE, MODE_KEY, MODES } from './ai.constants.mjs';

const aiMode = (root) => {
  const setting = JSON.parse(readFileSync(`${root}/package.json`, 'utf8')).tessera?.[MODE_KEY] ?? DEFAULT_MODE;
  if (MODES.includes(setting)) return { mode: setting };
  return { mode: 'enforce', problem: `package.json tessera.${MODE_KEY} is "${setting}"; it takes ${MODES.map((m) => `"${m}"`).join(' or ')}` };
};

export { aiMode };
