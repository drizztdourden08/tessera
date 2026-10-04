/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../strings/tessera-strings.type';
import { REASON_TEXT } from '../JsonInput.constants';
import type { JsonFault, JsonProblem } from '../JsonInput.type';

const jsonProblem = (text: string, fault: JsonFault, strings: TesseraStrings): JsonProblem => {
  const before = text.slice(0, fault.at);
  const line = before.split('\n').length;
  const column = fault.at - (before.lastIndexOf('\n') + 1) + 1;
  const what = strings.options[REASON_TEXT[fault.reason]];
  const message = strings.options.jsonAt(typeof what === 'string' ? what : '', line, column);
  return { reason: fault.reason, offset: fault.at, line, column, message };
};

export { jsonProblem };
