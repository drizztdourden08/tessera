/* @layer renderer-components @kind logic */
import { CUBE_LEVELS, CUBE_START, GRAY_BASE, GRAY_START, GRAY_STEP } from './ansi.constants';
import { nearestAnsi } from './ansi-nearest';

const level = (at: number): number => CUBE_LEVELS[at] ?? 0;

const ansi256 = (code: number): number => {
  if (code < CUBE_START) return code;
  if (code >= GRAY_START) {
    const gray = GRAY_BASE + (code - GRAY_START) * GRAY_STEP;
    return nearestAnsi(gray, gray, gray);
  }
  const cube = code - CUBE_START;
  return nearestAnsi(level(Math.floor(cube / 36)), level(Math.floor(cube / 6) % 6), level(cube % 6));
};

export { ansi256 };
