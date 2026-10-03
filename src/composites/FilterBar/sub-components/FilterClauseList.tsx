/* @layer renderer-components @kind component */
import { useCallback, useMemo, useState } from 'react';
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { toSchemaIndex } from '../../../data/schema/build-schema';
import { addClause } from '../behavior/clause-list';
import { removeClause } from '../behavior/remove-clause';
import { updateClauseById } from '../behavior/update-clause-by-id';
import { valueForOperatorChange } from '../behavior/value-for-operator-change';
import { AddFilterButton } from './AddFilterButton';
import { FilterChip } from './FilterChip';
import type { FilterClause } from '../../../data/filter/clause';
import type { FilterClauseListProps } from './FilterClauseList.type';

const FilterClauseList = (props: FilterClauseListProps) => {
  const { schema, clauses, fields, onChange } = props;
  const { filters } = useTesseraStrings();
  const index = useMemo(() => toSchemaIndex(schema), [schema]);
  const filteredPaths = useMemo(() => clauses.map((clause) => clause.path), [clauses]);
  const [fresh, setFresh] = useState<string | null>(null);

  const updateClause = useCallback((id: string, patch: Partial<FilterClause>) => {
    onChange(updateClauseById(clauses, id, patch));
  }, [clauses, onChange]);

  const handleOperatorChange = useCallback((clause: FilterClause, nextOp: string) => {
    const field = index.byPath(clause.path);
    const nextValue = field
      ? valueForOperatorChange({ kind: field.kind, previousOp: clause.op, nextOp, currentValue: clause.value })
      : clause.value;
    updateClause(clause.id, { op: nextOp, value: nextValue });
  }, [index, updateClause]);

  const handleAdd = useCallback((clause: FilterClause) => {
    setFresh(clause.id);
    onChange(addClause(clauses, clause));
  }, [clauses, onChange]);

  return (
    <>
      <AddFilterButton schema={index} fields={fields} excludePaths={filteredPaths} onAdd={handleAdd} />
      {clauses.map((clause) => {
        const field = index.byPath(clause.path);
        if (!field) return null;
        return (
          <FilterChip
            key={clause.id}
            field={field}
            clause={clause}
            openOnMount={clause.id === fresh}
            onChangeOperator={(nextOp) => handleOperatorChange(clause, nextOp)}
            onChangeValue={(value) => updateClause(clause.id, { value })}
            onChangeCaseSensitive={(caseSensitive) => updateClause(clause.id, { caseSensitive })}
            onToggleEnabled={(enabled) => updateClause(clause.id, { enabled })}
            onRemove={() => onChange(removeClause(clauses, clause.id))}
          />
        );
      })}
      {clauses.length > 1 && (
        <Button variant="ghost" size="sm" className="filter-bar__clear" onClick={() => onChange([])}>
          {filters.clearFilters}
        </Button>
      )}
    </>
  );
};

export { FilterClauseList };
