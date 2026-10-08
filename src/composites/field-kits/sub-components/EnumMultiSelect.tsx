/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { useMenuOpen } from '../behavior/useMenuOpen';
import { SUMMARY_MAX } from './EnumMultiSelect.constants';
import type { MenuNode } from '../../DropdownMenu';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { EnumMultiSelectProps } from './EnumMultiSelect.type';
import '../../../theme/field-kits.css';

const summarize = (selected: readonly string[], placeholder: string, strings: TesseraStrings['common'], labelOf: (option: string) => string): string => {
  if (!selected.length) return placeholder;
  if (selected.length <= SUMMARY_MAX) return selected.map(labelOf).join(', ');
  return strings.selectedCount(selected.length);
};

const EnumMultiSelect = (props: EnumMultiSelectProps) => {
  const { options, selected, placeholder, labelOf = String, onChange } = props;
  const menu = useMenuOpen<HTMLButtonElement>();
  const { common } = useTesseraStrings();

  const toggle = (option: string): void => {
    onChange(selected.includes(option)
      ? selected.filter((entry) => entry !== option)
      : [...selected, option]);
  };

  const items: MenuNode[] = options.map((option) => ({
    id: option,
    label: labelOf(option),
    checked: selected.includes(option),
    onSelect: () => toggle(option),
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
        {summarize(selected, placeholder, common, labelOf)}
      </Button>
      {menu.open && items.length > 0 && (
        <DropdownMenu groups={[{ id: 'options', items }]} anchorRef={menu.anchorRef} closeOnSelect={false} onClose={menu.close} />
      )}
    </>
  );
};

export { EnumMultiSelect };
