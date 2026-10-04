/* @layer renderer-components @kind logic */
import { ovalPath } from './oval-path';
import type { Oval } from './pelago.type';

const circlesPath = (ovals: readonly Oval[], grow = 0): string =>
  ovals.map(([x, y, rx, ry = rx]) => ovalPath([x, y], rx + grow, ry + grow)).join('');

export { circlesPath };
