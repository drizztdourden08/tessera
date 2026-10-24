/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { ToolbarContext } from '../behavior/toolbar-context';
import { toolAttributes } from '../behavior/tool-attributes';
import type { ToolbarToolButtonProps } from './ToolbarToolButton.type';

const ToolbarToolButton = (props: ToolbarToolButtonProps) => {
  const { anchorRef, icon, label, caption, active, disabled, onClick, onKeyDown, hover } = props;
  const context = useContext(ToolbarContext);
  const { orientation, size } = context;
  const attributes = { ref: anchorRef, active, disabled, className: 'toolbar__tool', onClick, onKeyDown, ...toolAttributes(props, context), ...hover };
  const glyph = <Icon name={icon} />;
  if (orientation === 'horizontal' && caption !== undefined) {
    return <Button variant="ghost" size={size} icon={glyph} aria-label={label} {...attributes}>{caption}</Button>;
  }
  return <IconButton variant="ghost" size={size} label={label} {...attributes}>{glyph}</IconButton>;
};

export { ToolbarToolButton };
