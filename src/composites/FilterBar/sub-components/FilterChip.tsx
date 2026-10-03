/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Span } from '../../../primitives/text-elements';
import { Glyph } from '../../../primitives/Glyph';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { findOperator } from '../../../data/filter/operators';
import { FilterChipValue } from './FilterChipValue';
import { OperatorMenu } from './OperatorMenu';
import type { FilterChipProps } from './FilterChip.type';

const FilterChip = (props: FilterChipProps) => {
  const {
    field, clause, openOnMount, onChangeOperator, onChangeValue, onToggleEnabled, onRemove, onChangeCaseSensitive,
  } = props;
  const { filters } = useTesseraStrings();
  const takesValue = findOperator(field.kind, clause.op)?.arity !== 'none';

  return (
    <Box role="group" aria-label={field.label} className={`filter-chip${clause.enabled ? '' : ' filter-chip--off'}`}>
      <Button
        variant="ghost"
        size="sm"
        className="filter-chip__segment filter-chip__field"
        aria-pressed={clause.enabled}
        aria-label={filters.applyFilterNamed(field.label)}
        title={filters.applyFilterNamed(field.label)}
        onClick={() => onToggleEnabled(!clause.enabled)}
      >
        <Span className="filter-chip__dot" aria-hidden />
        <Span className="filter-chip__field-label">{field.label}</Span>
      </Button>
      <OperatorMenu
        field={field}
        op={clause.op}
        caseSensitive={clause.caseSensitive}
        onChange={onChangeOperator}
        onChangeCaseSensitive={onChangeCaseSensitive}
      />
      {takesValue && <FilterChipValue field={field} clause={clause} openOnMount={openOnMount} onChange={onChangeValue} />}
      <IconButton
        variant="ghost"
        size="sm"
        className="filter-chip__segment filter-chip__remove"
        label={filters.removeFilterNamed(field.label)}
        onClick={onRemove}
      >
        <Glyph name="close" />
      </IconButton>
    </Box>
  );
};

export { FilterChip };
