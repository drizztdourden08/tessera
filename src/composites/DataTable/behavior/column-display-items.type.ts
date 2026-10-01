/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { IdRefTargetFieldResolver } from './display-substitution.type';
import type { ColumnActions } from '../DataTable.type';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

interface ColumnDisplayInput {
  path: string;
  field?: FieldDescriptor;
  displayField?: string;
  resolveTargetFields?: IdRefTargetFieldResolver;
  actions: ColumnActions;
  act: (run: () => void) => () => void;
  strings: TesseraStrings['table'];
}

export type { ColumnDisplayInput };
