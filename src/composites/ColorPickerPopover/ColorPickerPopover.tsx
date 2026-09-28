/* @layer renderer-components @kind component */
import { Portal } from '../../primitives/Portal';
import { Floating } from '../../primitives/Floating';
import { ColorPicker } from '../ColorPicker';
import { useColorPickerPopover } from './behavior/useColorPickerPopover';
import './ColorPickerPopover.css';
import type { ColorPickerPopoverProps } from './ColorPickerPopover.type';

const ColorPickerPopover = (props: ColorPickerPopoverProps) => {
  const { open, anchorRef, onClose, ...pickerProps } = props;
  const { position, panelRef } = useColorPickerPopover({ open, anchorRef, onClose });

  if (!open) return null;

  return (
    <Portal layer="popover">
      <Floating ref={panelRef} className="color-picker-popover" placement={position}>
        <ColorPicker {...pickerProps} onClose={onClose} />
      </Floating>
    </Portal>
  );
};

export { ColorPickerPopover };
