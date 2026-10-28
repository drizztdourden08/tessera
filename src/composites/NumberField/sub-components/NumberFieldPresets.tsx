/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import type { NumberFieldPresetsProps } from '../NumberField.type';

const NumberFieldPresets = ({ presets, value, suffix, disabled, onPick }: NumberFieldPresetsProps) => {
  const { fields } = useTesseraStrings();
  const items = presets.map((preset) => ({
    id: String(preset.value),
    label: preset.label ?? `${preset.value}${suffix ?? ''}`,
    kind: 'radio' as const,
    checked: preset.value === value,
    onSelect: () => onPick(preset.value),
  }));
  return (
    <DropdownMenu
      groups={[{ id: 'presets', items }]}
      label={fields.presets}
      trigger={{ label: fields.presets, icon: 'chevron-down', iconOnly: true }}
      variant="ghost"
      size="sm"
      disabled={disabled}
    />
  );
};

export { NumberFieldPresets };
