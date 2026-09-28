/* @layer renderer-components @kind component */
import { IconButton } from '../../../primitives/IconButton';
import { Glyph } from '../../../primitives/Icon';
import type { RemoveItemButtonProps } from './RemoveItemButton.type';

const RemoveItemButton = ({ disabled, onRemove }: RemoveItemButtonProps) => (
  <IconButton label="Remove" variant="danger" disabled={disabled} onClick={onRemove}>
    <Glyph name="close" />
  </IconButton>
);

export { RemoveItemButton };
