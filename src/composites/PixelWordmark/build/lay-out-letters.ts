/* @layer renderer-components @kind logic */
import { PIXEL_FONT } from '../font/pixel-font.constants';
import { CAP_HEIGHT, LETTER_GAP, MARGIN, WORD_GAP } from './lay-out-letters.constants';
import type { LetterLayout, PlacedLetter } from './lay-out-letters.type';

const layOutLetters = (text: string): LetterLayout => {
  const letters: PlacedLetter[] = [];
  let x = MARGIN;
  for (const ch of text) {
    if (ch === ' ') {
      x += WORD_GAP;
      continue;
    }
    const glyph = PIXEL_FONT[ch.toUpperCase()];
    if (!glyph) continue;
    const rows = ch === ch.toUpperCase() ? glyph.upper : glyph.lower;
    letters.push({ rows, x, y: MARGIN + CAP_HEIGHT - rows.length });
    x += (rows[0]?.length ?? 0) + LETTER_GAP;
  }
  const width = letters.length ? x - LETTER_GAP + MARGIN : 0;
  return { letters, width, height: CAP_HEIGHT + 2 * MARGIN + 1 };
};

export { layOutLetters };
