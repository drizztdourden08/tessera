/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Checkbox } from '../../../primitives/Checkbox';
import { Flex } from '../../../primitives/Flex';
import { Glyph } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Text } from '../../../primitives/Text';
import { findOperator } from '../../../data/filter/operators';
import { resolveFieldKit } from '../../field-kits';
import { OperatorMenu } from './OperatorMenu';
import type { FilterClauseCardProps } from './FilterClauseCard.type';
import '../../../theme/filter-bar.css';

const FilterClauseCard = (props: FilterClauseCardProps) => {
  const {
    field, clause, onChangeOperator, onChangeValue, onToggleEnabled, onRemove, onChangeCaseSensitive,
  } = props;
  const kit = resolveFieldKit(field.kind);
  const arity = findOperator(field.kind, clause.op)?.arity;
  const FilterControl = arity === 'none' ? undefined : kit?.FilterControl;

  const clauseClass = `filter-bar__clause${clause.enabled ? '' : ' filter-bar__clause--disabled'}`;
  const groupClass = `filter-bar__group${FilterControl ? '' : ' filter-bar__group--no-control'}`;

  return (
    <Box className={clauseClass}>
      <Text className="filter-bar__field-label" title={field.label}>{field.label}</Text>
      <Flex align="stretch" className={groupClass}>
        <Checkbox
          className="filter-bar__check"
          checked={clause.enabled}
          ariaLabel={`Apply the ${field.label} filter`}
          onChange={onToggleEnabled}
        />
        <OperatorMenu
          field={field}
          op={clause.op}
          caseSensitive={clause.caseSensitive}
          onChange={onChangeOperator}
          onChangeCaseSensitive={onChangeCaseSensitive}
        />
        {FilterControl && (
          <Box className="filter-bar__control">
            <FilterControl field={field} op={clause.op} value={clause.value} onChange={onChangeValue} />
          </Box>
        )}
        <IconButton
          variant="danger"
          size="sm"
          className="filter-bar__remove"
          label={`Remove filter on ${field.label}`}
          onClick={onRemove}
        >
          <Glyph name="close" />
        </IconButton>
      </Flex>
    </Box>
  );
};

export { FilterClauseCard };
