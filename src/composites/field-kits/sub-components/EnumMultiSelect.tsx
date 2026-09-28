/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { DropdownMenu } from '../../DropdownMenu';
import { useMenuOpen } from '../behavior/useMenuOpen';
import { SUMMARY_MAX } from './EnumMultiSelect.constants';
import type { MenuEntry } from '../../DropdownMenu';
import type { EnumMultiSelectProps } from './EnumMultiSelect.type';
import '../../../theme/field-kits.css';

const summarize = (selected: readonly string[], placeholder: string): string => {
  if (!selected.length) return placeholder;
  if (selected.length <= SUMMARY_MAX) return selected.join(', ');
  return `${selected.length} selected`;
};

const EnumMultiSelect = (props: EnumMultiSelectProps) => {
  const { options, selected, placeholder, onChange } = props;
  const menu = useMenuOpen<HTMLButtonElement>();

  const toggle = (option: string): void => {
    onChange(selected.includes(option)
      ? selected.filter((entry) => entry !== option)
      : [...selected, option]);
  };

  const items: MenuEntry[] = options.map((option) => ({
    key: option,
    label: option,
    checked: selected.includes(option),
    onClick: () => toggle(option),
  }));

  return (
    <>
      <Button
        ref={menu.anchorRef}
        variant="tertiary"
        size="sm"
        className="field-kit__multi-trigger"
        aria-haspopup="menu"
        aria-expanded={menu.open}
        onClick={menu.toggle}
      >
        {summarize(selected, placeholder)}
      </Button>
      {menu.open && items.length > 0 && <DropdownMenu items={items} anchorRef={menu.anchorRef} />}
    </>
  );
};

export { EnumMultiSelect };
