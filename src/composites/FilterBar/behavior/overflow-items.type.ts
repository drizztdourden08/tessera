/* @layer renderer-components @kind types */
import type { FilterClause } from '../../../data/filter/clause';
import type { SchemaIndex } from '../../../data/schema/build-schema';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface OverflowInput {
  folded: readonly FilterClause[];
  index: SchemaIndex;
  strings: TesseraStrings['filters'];
  onRemove: (id: string) => void;
}

export type { OverflowInput };
