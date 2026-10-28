/* @layer renderer-components @kind logic */
import { optionLabelOf } from '../../field-kits/option-label';
import type { MenuItem } from '../../DropdownMenu';
import { clauseValueText } from './clause-value-text';
import type { OverflowInput } from './overflow-items.type';

const overflowItems = (input: OverflowInput): MenuItem[] =>
  input.folded.flatMap((clause) => {
    const field = input.index.byPath(clause.path);
    if (field === undefined) return [];
    const text = clauseValueText({ op: clause.op, value: clause.value, strings: input.strings, labelOf: optionLabelOf(field) });
    return [{
      id: clause.id,
      label: text === undefined ? field.label : `${field.label}: ${text}`,
      icon: 'x',
      description: input.strings.removeFilterNamed(field.label),
      onSelect: () => input.onRemove(clause.id),
    }];
  });

export { overflowItems };
