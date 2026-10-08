/* @layer renderer-components @kind component */
import { Anchored } from '../../primitives/Anchored';
import { ColorPicker } from '../ColorPicker';
import { useColorPickerPopover } from './behavior/useColorPickerPopover';
import './ColorPickerPopover.css';
import type { ColorPickerPopoverProps } from './ColorPickerPopover.type';

const ColorPickerPopover = (props: ColorPickerPopoverProps) => {
  const { open, anchorRef, onClose, ...pickerProps } = props;
  const { fallback, dropUp, panelRef } = useColorPickerPopover({ open, anchorRef, onClose });

  if (!open) return null;

  return (
    <Anchored ref={panelRef} anchorRef={anchorRef} fallback={fallback} className="color-picker-popover" data-drop-up={dropUp ? 'true' : undefined}>
      <ColorPicker {...pickerProps} onClose={onClose} />
    </Anchored>
  );
};

export { ColorPickerPopover };
