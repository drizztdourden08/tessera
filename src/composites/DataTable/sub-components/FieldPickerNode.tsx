/* @layer renderer-components @kind component */
import { useRef, useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Floating } from '../../../primitives/Floating';
import { Glyph } from '../../../primitives/Glyph';
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { SUB_PANEL_WIDTH } from './FieldPicker.constants';
import type { FieldPickerNodeProps, PanelPosition } from './FieldPickerNode.type';
import '../../../theme/field-picker.css';

const FieldPickerNode = (props: FieldPickerNodeProps) => {
  const { node, onPick } = props;
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState<PanelPosition | null>(null);

  const handleEnter = (): void => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const overflows = rect.right + SUB_PANEL_WIDTH > ownerWindowOf(ref.current).innerWidth;
    setPosition({ top: rect.top, left: overflows ? rect.left - SUB_PANEL_WIDTH : rect.right });
  };

  if (node.pickable) {
    return (
      <Pressable className="dropdown__item" onClick={() => onPick(node.path)}>
        <Text className="dropdown__label">{node.label}</Text>
        <Text className="field-picker__kind">{node.kind}</Text>
      </Pressable>
    );
  }

  return (
    <Box
      ref={ref}
      className="dropdown__submenu-trigger"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setPosition(null)}
    >
      <Box className="dropdown__item dropdown__item--parent">
        <Text className="dropdown__label">{node.label}</Text>
        <Text className="dropdown__chevron"><Glyph name="chevronRight" /></Text>
      </Box>
      {position && (
        <Floating className="dropdown-menu dropdown-menu--sub field-picker" placement={position}>
          {node.children.map((child) => (
            <FieldPickerNode key={child.path} node={child} onPick={onPick} />
          ))}
        </Floating>
      )}
    </Box>
  );
};

export { FieldPickerNode };
