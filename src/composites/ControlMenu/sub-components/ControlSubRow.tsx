/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Glyph } from '../../../primitives/Glyph';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { SUB_ICON_SIZE } from '../ControlMenu.constants';
import type { ControlSubRowProps } from '../ControlMenu.type';

const ControlSubRow = (props: ControlSubRowProps) => {
  const { label, icon, description, open, panelId, onOpen } = props;
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key !== 'ArrowRight') return;
    event.preventDefault();
    onOpen();
  };

  return (
    <Pressable
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={open ? panelId : undefined}
      className="dropdown__item dropdown__item--parent control-menu__sub-row focus-ring-inset"
      onClick={onOpen}
      onKeyDown={onKeyDown}
    >
      {icon && <Icon name={icon} size={SUB_ICON_SIZE} className="control-menu__sub-icon" />}
      <Span className="dropdown__label">{label}</Span>
      {description && <Span className="dropdown__description">{description}</Span>}
      <Span className="dropdown__chevron"><Glyph name="chevronRight" size={12} /></Span>
    </Pressable>
  );
};

export { ControlSubRow };
