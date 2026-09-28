/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { operatorsFor } from '../../../data/filter/operators';
import { DropdownMenu } from '../../DropdownMenu';
import { operatorMenuItems } from '../behavior/operator-menu-items';
import { supportsCaseModifier } from '../behavior/supports-case-modifier';
import { useAnchorMenu } from '../behavior/useAnchorMenu';
import { glyphForOperatorIcon } from '../behavior/operator-icon-glyphs';
import { CASE_SENSITIVE_SUFFIX } from './OperatorMenu.constants';
import type { OperatorMenuProps } from './OperatorMenu.type';
import '../../../theme/filter-bar.css';

const OperatorMenu = (props: OperatorMenuProps) => {
  const { field, op, caseSensitive, onChange, onChangeCaseSensitive } = props;
  const menu = useAnchorMenu<HTMLButtonElement>('.dropdown-menu');
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
  });

  const marked = caseSensitive === true && supportsCaseModifier(field.kind);
  const label = current ? `Filter operator: ${current.label}` : 'Filter operator';

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="tertiary"
        size="sm"
        className={`filter-bar__operator-button${marked ? ' filter-bar__operator-button--cased' : ''}`}
        aria-haspopup="menu"
        aria-expanded={menu.open}
        aria-label={marked ? `${label}${CASE_SENSITIVE_SUFFIX}` : label}
        onClick={menu.toggle}
      >
        {current ? glyphForOperatorIcon(current.icon) : '?'}
      </Button>
      {menu.open && items.length > 0 && <DropdownMenu items={items} anchorRef={menu.anchorRef} />}
    </>
  );
};

export { OperatorMenu };
