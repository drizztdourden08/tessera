/* @layer renderer-components @kind logic */
import { ansi256 } from './ansi-256';
import { NO_COLOUR } from './ansi-extended.constants';
import type { ExtendedColour } from './ansi-extended.type';
import { nearestAnsi } from './ansi-nearest';

const ansiExtended = (rest: readonly number[]): ExtendedColour => {
  if (rest[0] === 5) return { colour: ansi256(rest[1] ?? 0), used: 2 };
  if (rest[0] === 2) return { colour: nearestAnsi(rest[1] ?? 0, rest[2] ?? 0, rest[3] ?? 0), used: 4 };
  return NO_COLOUR;
};

export { ansiExtended };
