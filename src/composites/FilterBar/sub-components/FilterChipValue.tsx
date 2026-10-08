/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Span } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { optionLabelOf } from '../../field-kits/option-label';
import { clauseValueText } from '../behavior/clause-value-text';
import { useAnchorMenu } from '../behavior/useAnchorMenu';
import { ChoiceMenu } from './ChoiceMenu';
import { ValuePopover } from './ValuePopover';
import { POPUP_SELECTOR } from './FilterChipValue.constants';
import type { FilterChipValueProps } from './FilterChipValue.type';

const FilterChipValue = (props: FilterChipValueProps) => {
  const { field, clause, openOnMount, onChange } = props;
  const { filters } = useTesseraStrings();
  const menu = useAnchorMenu<HTMLButtonElement>(POPUP_SELECTOR, openOnMount);
  const labelOf = optionLabelOf(field);
  const text = clauseValueText({ op: clause.op, value: clause.value, strings: filters, labelOf });
  const choices = field.kind === 'enum' ? field.options : undefined;

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="ghost"
        size="sm"
        className="filter-chip__segment filter-chip__value"
        aria-haspopup={choices ? 'menu' : 'dialog'}
        aria-expanded={menu.open}
        aria-label={filters.editValueNamed(field.label)}
        title={text}
        onClick={menu.toggle}
      >
        <Span tone={text === undefined ? 'muted' : undefined} className="filter-chip__value-text">{text ?? filters.pickValue}</Span>
      </Button>
      {menu.open && choices && (
        <ChoiceMenu options={choices} labelOf={labelOf} value={clause.value} anchorRef={menu.anchorRef} onChange={onChange} onClose={menu.close} />
      )}
      {menu.open && !choices && (
        <ValuePopover field={field} clause={clause} anchorRef={menu.anchorRef} onChange={onChange} onClose={menu.close} />
      )}
    </>
  );
};

export { FilterChipValue };
