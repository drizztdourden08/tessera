/* @layer renderer-components @kind data */
import type { AnsiStyle } from './ansi.type';

const FLAGS: Readonly<Record<number, Partial<AnsiStyle>>> = {
  1: { bold: true },
  2: { dim: true },
  3: { italic: true },
  4: { underline: true },
  22: { bold: false, dim: false },
  23: { italic: false },
  24: { underline: false },
  39: { fg: null },
  49: { bg: null },
};

export { FLAGS };
