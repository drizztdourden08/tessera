/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { isIconName } from '../../../primitives/Icon/behavior/is-icon-name';
import { IconButton } from '../../../primitives/IconButton';
import { keyBadgeKeys } from '../behavior/key-badge-keys';
import { ToolbarContext } from '../behavior/toolbar-context';
import { toolAttributes } from '../behavior/tool-attributes';
import { ToolbarRow } from './ToolbarRow';
import { ToolbarToolDecor } from './ToolbarToolDecor';
import type { ToolbarToolButtonProps } from './ToolbarToolButton.type';

const ToolbarToolButton = (props: ToolbarToolButtonProps) => {
  const { anchorRef, icon, label, caption, description, shortcut, active, disabled, badge, onClick, onContextMenu, onKeyDown, hover, hold } = props;
  const context = useContext(ToolbarContext);
  const { orientation, layout, size, labels, keyBadges } = context;
  const attributes = { ref: anchorRef, active, disabled, className: 'toolbar__tool', onClick, onContextMenu, onKeyDown, ...toolAttributes(props, context), ...hover, ...hold };
  const glyph = typeof icon === 'string' && isIconName(icon) ? <Icon name={icon} /> : icon;
  const decor = { badge, shortcut, keyBadge: keyBadges && layout === 'bar' && keyBadgeKeys(shortcut) !== undefined };
  if (layout === 'list') {
    return <ToolbarToolDecor {...decor}><ToolbarRow glyph={glyph} label={label} description={description} shortcut={shortcut} size={size} attributes={attributes} /></ToolbarToolDecor>;
  }
  if (orientation === 'horizontal' && labels && caption !== undefined) {
    return <ToolbarToolDecor {...decor}><Button variant="ghost" size={size} icon={glyph} aria-label={label} {...attributes}>{caption}</Button></ToolbarToolDecor>;
  }
  return <ToolbarToolDecor {...decor}><IconButton variant="ghost" size={size} label={label} {...attributes}>{glyph}</IconButton></ToolbarToolDecor>;
};

export { ToolbarToolButton };
