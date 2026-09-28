/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import type { WidgetTitlebarProps } from './WidgetTitlebar.type';

const WidgetTitlebar = (props: WidgetTitlebarProps) => {
  const { label, gearRef, onMouseDown, onToggleSettings, onClose } = props;
  return (
    <Box className="widget__titlebar" onMouseDown={onMouseDown}>
      <Text className="widget__title">{label}</Text>
      <Box className="widget__titlebar-actions">
        <Pressable ref={gearRef} className="widget__btn" onClick={onToggleSettings} title="Settings">
          <Glyph name="gear" />
        </Pressable>
        <Pressable className="widget__btn" onClick={onClose} title="Close">
          <Glyph name="close" />
        </Pressable>
      </Box>
    </Box>
  );
};

export { WidgetTitlebar };
