/* @layer renderer-components @kind component */
import { Glyph } from '../../../primitives/Glyph';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import type { MenuItemButtonProps } from './MenuItemButton.type';

const MenuItemButton = (props: MenuItemButtonProps) => {
  const { item } = props;

  return (
    <Pressable
      className="dropdown__item focus-ring-inset"
      onClick={item.onClick}
      disabled={item.disabled}
    >
      {item.icon && <Span className="dropdown__icon">{item.icon}</Span>}
      <Span className="dropdown__label">{item.label}</Span>
      {item.checked && <Span className="dropdown__check"><Glyph name="check" /></Span>}
    </Pressable>
  );
};

export { MenuItemButton };
