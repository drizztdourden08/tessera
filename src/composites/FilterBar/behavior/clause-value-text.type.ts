/* @layer renderer-components @kind types */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface ClauseValueInput {
  op: string;
  value: unknown;
  strings: TesseraStrings['filters'];
  labelOf?: (value: string) => string;
}

export type { ClauseValueInput };
