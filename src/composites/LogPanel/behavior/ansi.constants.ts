/* @layer renderer-components @kind data */
import type { AnsiStyle } from './ansi.type';

const ESC = String.fromCharCode(27);
const BEL = String.fromCharCode(7);

const ESCAPE = new RegExp(`${ESC}(?:\\[([0-?]*)[ -/]*([@-~])|\\][^${BEL}${ESC}]*(?:${BEL}|${ESC}\\\\)|[@-_]|)`, 'g');

const PLAIN: AnsiStyle = { fg: null, bg: null, bold: false, dim: false, italic: false, underline: false };

const ANSI_NAMES = [
  'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white',
  'bright-black', 'bright-red', 'bright-green', 'bright-yellow', 'bright-blue', 'bright-magenta', 'bright-cyan', 'bright-white',
] as const;

const ANSI_RGB: readonly (readonly [number, number, number])[] = [
  [0, 0, 0], [205, 49, 49], [13, 188, 121], [229, 229, 16], [36, 114, 200], [188, 63, 188], [17, 168, 205], [229, 229, 229],
  [102, 102, 102], [241, 76, 76], [35, 209, 139], [245, 245, 67], [59, 142, 234], [214, 112, 214], [41, 184, 219], [255, 255, 255],
];

const CUBE_LEVELS = [0, 95, 135, 175, 215, 255] as const;
const CUBE_START = 16;
const GRAY_START = 232;
const GRAY_BASE = 8;
const GRAY_STEP = 10;
const BRIGHT_OFFSET = 8;

export { ANSI_NAMES, ANSI_RGB, BRIGHT_OFFSET, CUBE_LEVELS, CUBE_START, ESCAPE, GRAY_BASE, GRAY_START, GRAY_STEP, PLAIN };
