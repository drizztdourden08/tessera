/* @layer renderer-components @kind util */
import { MINUS } from './slot-format.constants';
import type { PatternSlotSpec } from './parse-pattern.type';

const signedText = (text: string, body: string, slot: PatternSlotSpec): string => {
  const allowsMinus = slot.min === undefined || slot.min < 0;
  return allowsMinus && text.trimStart().startsWith(MINUS) ? `${MINUS}${body}` : body;
};

export { signedText };
