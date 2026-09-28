/* @layer renderer-components @kind types */
import type { SchemaLike } from '../../../data/schema/build-schema';
import type { FilterClause } from '../../../data/filter/clause';

interface AddFilterButtonProps {
  schema: SchemaLike;
  excludePaths?: readonly string[];
  onAdd: (clause: FilterClause) => void;
}

export type { AddFilterButtonProps };
