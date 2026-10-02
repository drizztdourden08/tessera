/* @layer renderer-components @kind util */
import { NUMBER_FORMAT } from './value-rule.constants';
import type { NumberPattern } from './value-rule.type';

const parseNumberPattern = (text: string): NumberPattern => {
  const match = NUMBER_FORMAT.exec(text);
  if (!match || text === '' || text === '+') {
    throw new Error(`"${text}" is not a number format. Write 0 for whole numbers, 0.0 for one decimal, 0.## for up to two, #,##0 to group thousands, or +0 to sign.`);
  }
  const [, sign = '', whole = '', fixed = '', optional = ''] = match;
  if (fixed.length + optional.length > 10) throw new Error(`"${text}" asks for more than 10 decimals.`);
  return {
    minDecimals: fixed.length,
    maxDecimals: fixed.length + optional.length,
    grouping: whole.includes(','),
    sign: sign === '+',
  };
};

export { parseNumberPattern };
