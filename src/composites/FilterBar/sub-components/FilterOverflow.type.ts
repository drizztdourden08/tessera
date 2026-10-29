/* @layer renderer-components @kind types */
import type { FilterClause } from '../../../data/filter/clause';
import type { SchemaIndex } from '../../../data/schema/build-schema';

interface FilterOverflowProps {
  folded: readonly FilterClause[];
  index: SchemaIndex;
  onRemove: (id: string) => void;
}

export type { FilterOverflowProps };
