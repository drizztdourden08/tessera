/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Shortcut } from '../../../primitives/Shortcut';
import { Span } from '../../../primitives/text-elements';
import type { PaletteCellProps } from '../PointerPalette.type';

const PaletteCell = ({ item, props }: PaletteCellProps) => (
  <Pressable className="pointer-palette__cell" title={item.label} {...props}>
    <Icon {...item.icon} />
    <Span className="pointer-palette__label">{item.label}</Span>
    {item.shortcut !== undefined && <Shortcut keys={item.shortcut} size="xs" className="pointer-palette__key" />}
  </Pressable>
);

export { PaletteCell };
