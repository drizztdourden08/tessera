/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import { specGroups } from '../behavior/spec-groups';
import type { CommandSpecPickerProps } from '../CommandInput.type';

const CommandSpecPicker = ({ specs, size, disabled, onPick }: CommandSpecPickerProps) => {
  const { commandInput } = useTesseraStrings();
  return (
    <DropdownMenu
      trigger={{ label: commandInput.pick, icon: 'list', iconOnly: true }}
      groups={specGroups(specs, onPick)}
      label={commandInput.pick}
      variant="secondary"
      size={size}
      disabled={disabled}
      filter
      filterPlaceholder={commandInput.search}
      className="command-input__picker"
    />
  );
};

export { CommandSpecPicker };
