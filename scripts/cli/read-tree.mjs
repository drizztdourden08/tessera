/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';

const readTree = () => JSON.parse(readFileSync(new URL('../../ai/registry.json', import.meta.url), 'utf8')).tree;

export { readTree };
