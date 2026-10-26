/* @layer renderer-components @kind logic */
import { BRIGHT_OFFSET, PLAIN } from './ansi.constants';
import { ansiExtended } from './ansi-extended';
import { FLAGS } from './ansi-sgr.constants';
import type { AnsiStyle } from './ansi.type';

const paletteOf = (code: number): Partial<AnsiStyle> => {
  if (code >= 30 && code <= 37) return { fg: code - 30 };
  if (code >= 90 && code <= 97) return { fg: code - 90 + BRIGHT_OFFSET };
  if (code >= 40 && code <= 47) return { bg: code - 40 };
  if (code >= 100 && code <= 107) return { bg: code - 100 };
  return FLAGS[code] ?? {};
};

const applySgr = (style: AnsiStyle, params: string): AnsiStyle => {
  const codes = params === '' ? [0] : params.split(/[;:]/).map((part) => Number(part) || 0);
  let next = style;
  for (let i = 0; i < codes.length; i += 1) {
    const code = codes[i] ?? 0;
    if (code === 38 || code === 48) {
      const { colour, used } = ansiExtended(codes.slice(i + 1));
      if (colour !== null) next = code === 38 ? { ...next, fg: colour } : { ...next, bg: colour % BRIGHT_OFFSET };
      i += used;
    } else {
      next = code === 0 ? PLAIN : { ...next, ...paletteOf(code) };
    }
  }
  return next;
};

export { applySgr };
