/* @layer renderer-components @kind logic */
import type { MenuItem } from '../../DropdownMenu';
import type { ChoiceMenuSpec } from './widget-options-menu.type';

const choiceMenu = <T extends string>(spec: ChoiceMenuSpec<T>): MenuItem => {
  const { id, label, icon, value, choices, words, onChange } = spec;
  const current = choices.find((choice) => choice.value === value);
  return {
    id,
    label,
    icon: icon ?? current?.icon,
    description: current ? words[current.label] : undefined,
    children: choices.map((choice) => ({
      id: `${id}:${choice.value}`,
      label: words[choice.label],
      description: words[choice.hint],
      icon: choice.icon,
      kind: 'radio' as const,
      checked: choice.value === value,
      onSelect: () => onChange(choice.value),
    })),
  };
};

export { choiceMenu };
