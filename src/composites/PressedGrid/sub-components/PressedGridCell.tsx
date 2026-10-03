/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { InputIcon, gamepadInputIcon } from '../../../primitives/InputIcon';
import { Span } from '../../../primitives/text-elements';
import { PRESSED_GRID_ICON_SIZE } from '../PressedGrid.constants';
import type { PressedGridCellProps } from '../PressedGrid.type';

const PressedGridCell = (props: PressedGridCellProps) => {
  const { item, family, down } = props;
  const { id, label, title } = item;
  const icon = item.icon ?? (family ? gamepadInputIcon(family, id) : null);
  const text = label ?? (icon ? null : id);

  return (
    <Box title={title ?? id} className="pressed-grid__cell" data-pressed={down ? '' : undefined}>
      {icon && <InputIcon {...icon} size={PRESSED_GRID_ICON_SIZE} tone="theme" className="pressed-grid__icon" />}
      {text != null && <Span className="pressed-grid__label">{text}</Span>}
    </Box>
  );
};

export { PressedGridCell };
