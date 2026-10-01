/* @layer renderer-components @kind util */
import { digitLimit } from './digit-limit';
import { signedText } from './signed-text';
import { DOT, NON_DECIMAL } from './slot-format.constants';
import type { PatternSlotSpec } from './parse-pattern.type';

const cleanDecimal = (text: string, slot: PatternSlotSpec): string => {
  const [whole = '', ...rest] = text.replace(NON_DECIMAL, '').split(DOT);
  const head = whole.slice(0, digitLimit(slot));
  const body = rest.length === 0 ? head : `${head}${DOT}${rest.join('').slice(0, slot.places ?? 0)}`;
  return signedText(text, body, slot);
};

export { cleanDecimal };
