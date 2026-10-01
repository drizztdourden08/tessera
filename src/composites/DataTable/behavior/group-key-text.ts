/* @layer renderer-components @kind logic */
import { countLabel } from '../../field-kits/count-label';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const groupKeyText = (key: string, kind: string, strings: TesseraStrings): string | undefined => {
  if (kind === 'boolean') return key === 'true' ? strings.common.yes : strings.common.no;
  if (kind === 'array') return countLabel(Number(key), strings.records);
  return undefined;
};

export { groupKeyText };
