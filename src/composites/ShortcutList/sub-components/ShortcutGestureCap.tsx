/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import type { ShortcutGestureCapProps } from '../ShortcutList.type';

const ShortcutGestureCap = (props: ShortcutGestureCapProps) => {
  const { gesture, size } = props;
  return (
    <Box as="kbd" className={`shortcut shortcut--${size} shortcut--idle`}>
      <Box as="kbd" className="shortcut__cap shortcut-list__gesture">
        <Icon name={gesture.icon} size={size === 'xs' ? 10 : 12} />
        <Box as="span">{gesture.label}</Box>
      </Box>
    </Box>
  );
};

export { ShortcutGestureCap };
