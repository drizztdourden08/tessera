/* @layer renderer-components @kind component */
import { IconButton } from '../../../primitives/IconButton';
import { Glyph } from '../../../primitives/Glyph';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { RemoveItemButtonProps } from './RemoveItemButton.type';

const RemoveItemButton = ({ disabled, onRemove }: RemoveItemButtonProps) => {
  const { common } = useTesseraStrings();
  return (
    <IconButton label={common.remove} variant="danger" disabled={disabled} onClick={onRemove}>
      <Glyph name="close" />
    </IconButton>
  );
};

export { RemoveItemButton };
