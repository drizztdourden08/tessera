/* @layer renderer-components @kind logic */
import { glyphForOperatorIcon } from './operator-icon-glyphs';
import { menuMark } from './menu-mark';
import { supportsCaseModifier } from './supports-case-modifier';
import { MATCH_CASE_KEY } from './operator-menu-items.constants';
import type { MenuNode } from '../../DropdownMenu';
import type { OperatorMenuInput } from './operator-menu-items.type';

const operatorMenuItems = (input: OperatorMenuInput): MenuNode[] => {
  const {
    kind, specs, op, caseSensitive, onPickOperator, onToggleCaseSensitive, strings, operatorLabels,
  } = input;

  const items: MenuNode[] = specs.map((spec) => ({
    id: spec.id,
    icon: menuMark(glyphForOperatorIcon(spec.icon)),
    label: operatorLabels[spec.icon],
    checked: spec.id === op,
    onSelect: () => onPickOperator(spec.id),
  }));

  if (!onToggleCaseSensitive || !supportsCaseModifier(kind)) return items;

  return [...items, { separator: true }, {
    id: MATCH_CASE_KEY,
    icon: menuMark(strings.matchCaseMark),
    label: strings.matchCase,
    checked: caseSensitive === true,
    onSelect: () => onToggleCaseSensitive(caseSensitive !== true),
  }];
};

export { operatorMenuItems };
