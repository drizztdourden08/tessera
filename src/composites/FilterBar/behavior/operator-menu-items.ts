/* @layer renderer-components @kind logic */
import { operatorsFor } from '../../../data/filter/operators';
import { glyphForOperatorIcon } from './operator-icon-glyphs';
import { supportsCaseModifier } from './supports-case-modifier';
import { MATCH_CASE_ICON, MATCH_CASE_KEY, MATCH_CASE_LABEL } from './operator-menu-items.constants';
import type { MenuEntry } from '../../DropdownMenu';
import type { OperatorMenuInput } from './operator-menu-items.type';

const operatorMenuItems = (input: OperatorMenuInput): MenuEntry[] => {
  const { kind, op, caseSensitive, onPickOperator, onToggleCaseSensitive } = input;

  const items: MenuEntry[] = operatorsFor(kind).map((spec) => ({
    key: spec.id,
    icon: glyphForOperatorIcon(spec.icon),
    label: spec.label,
    checked: spec.id === op,
    onClick: () => onPickOperator(spec.id),
  }));

  if (!onToggleCaseSensitive || !supportsCaseModifier(kind)) return items;

  return [...items, 'separator', {
    key: MATCH_CASE_KEY,
    icon: MATCH_CASE_ICON,
    label: MATCH_CASE_LABEL,
    checked: caseSensitive === true,
    onClick: () => onToggleCaseSensitive(caseSensitive !== true),
  }];
};

export { operatorMenuItems };
