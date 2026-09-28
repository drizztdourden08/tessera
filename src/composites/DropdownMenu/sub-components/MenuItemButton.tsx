/* @layer renderer-components @kind component */
import { Glyph } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import type { MenuItemButtonProps } from './MenuItemButton.type';

const MenuItemButton = (props: MenuItemButtonProps) => {
  const { item } = props;

  return (
    <Pressable
      className="dropdown__item"
      onClick={item.onClick}
      disabled={item.disabled}
    >
      {item.icon && <Text className="dropdown__icon">{item.icon}</Text>}
      <Text className="dropdown__label">{item.label}</Text>
      {item.checked && <Text className="dropdown__check"><Glyph name="check" /></Text>}
    </Pressable>
  );
};

export { MenuItemButton };
