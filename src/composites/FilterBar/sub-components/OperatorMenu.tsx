/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Span } from '../../../primitives/text-elements';
import { operatorsFor } from '../../../data/filter/operators';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { operatorMenuItems } from '../behavior/operator-menu-items';
import { supportsCaseModifier } from '../behavior/supports-case-modifier';
import { useAnchorMenu } from '../behavior/useAnchorMenu';
import type { OperatorMenuProps } from './OperatorMenu.type';

const OperatorMenu = (props: OperatorMenuProps) => {
  const { field, op, caseSensitive, onChange, onChangeCaseSensitive } = props;
  const menu = useAnchorMenu<HTMLButtonElement>('.dropdown-menu');
  const { filters, filterOperators } = useTesseraStrings();
  const specs = operatorsFor(field.kind);
  const current = specs.find((spec) => spec.id === op) ?? specs[0];

  const handlePick = (id: string): void => {
    onChange(id);
    menu.close();
  };

  const items = operatorMenuItems({
    kind: field.kind,
    op,
    caseSensitive,
    onPickOperator: handlePick,
    onToggleCaseSensitive: onChangeCaseSensitive,
    strings: filters,
    operatorLabels: filterOperators,
  });

  const marked = caseSensitive === true && supportsCaseModifier(field.kind);
  const word = current ? filterOperators[current.icon] : filters.operator;
  const label = current ? filters.operatorNamed(word) : filters.operator;

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="ghost"
        size="sm"
        className="filter-chip__segment filter-chip__operator"
        aria-haspopup="menu"
        aria-expanded={menu.open}
        aria-label={marked ? filters.withMatchCase(label) : label}
        onClick={menu.toggle}
      >
        {word}
        {marked && <Span className="filter-chip__case">{filters.matchCaseMark}</Span>}
      </Button>
      {menu.open && items.length > 0 && <DropdownMenu groups={[{ id: 'operators', items }]} anchorRef={menu.anchorRef} onClose={menu.close} />}
    </>
  );
};

export { OperatorMenu };
