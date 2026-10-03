/* @layer renderer-components @kind component */
import { DropdownMenu } from '../../DropdownMenu';
import type { MenuNode } from '../../DropdownMenu';
import type { ChoiceMenuProps } from './ChoiceMenu.type';

const picked = (value: unknown): readonly string[] => (Array.isArray(value) ? value.map(String) : []);

const ChoiceMenu = (props: ChoiceMenuProps) => {
  const { options, value, anchorRef, onChange, onClose } = props;
  const selected = picked(value);
  const items: MenuNode[] = options.map((option) => ({
    id: option,
    label: option,
    checked: selected.includes(option),
    onSelect: () => onChange(selected.includes(option) ? selected.filter((entry) => entry !== option) : [...selected, option]),
  }));
  return <DropdownMenu groups={[{ id: 'choices', items }]} anchorRef={anchorRef} closeOnSelect={false} onClose={onClose} />;
};

export { ChoiceMenu };
