/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const retryWord = (label: string | undefined, waiting: boolean, common: TesseraStrings['common']): string => {
  if (label !== undefined) return label;
  return waiting ? common.retryNow : common.retry;
};

export { retryWord };
