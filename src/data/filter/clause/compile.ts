/* @layer renderer-components @kind logic */
import type { SchemaLike } from '../../schema/build-schema';
import { toSchemaIndex } from '../../schema/build-schema';
import { getPath } from '../../schema/path';
import { getFieldTester } from '../tester-registry';
import type { FilterTestOptions } from '../tester-registry';
import { PASS } from './clause.constants';
import type { FilterClause, RowPredicate } from './clause.type';

const clauseToPredicate = (clause: FilterClause, schema: SchemaLike): RowPredicate | undefined => {
  const field = toSchemaIndex(schema).byPath(clause.path);
  if (!field) return undefined;
  const tester = getFieldTester(field.kind);
  if (!tester) return undefined;
  const options: FilterTestOptions = { caseSensitive: clause.caseSensitive };
  return (row: unknown) => tester.test(getPath(row, clause.path), clause.op, clause.value, options);
};

const compile = (clauses: readonly FilterClause[], schema: SchemaLike): RowPredicate => {
  const index = toSchemaIndex(schema);
  const tests = clauses
    .filter((clause) => clause.enabled)
    .map((clause) => clauseToPredicate(clause, index))
    .filter((test): test is RowPredicate => test !== undefined);
  if (!tests.length) return PASS;
  return (row: unknown) => tests.every((test) => test(row));
};

export { compile };
