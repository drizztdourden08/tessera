/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Shortcut } from '../../../primitives/Shortcut';
import type { ShortcutListRowProps } from '../ShortcutList.type';
import { ShortcutGestureCap } from './ShortcutGestureCap';

const ShortcutListRow = (props: ShortcutListRowProps) => {
  const { item, size } = props;
  const { keys, mouse, gesture, description } = item;
  const hasKeys = keys !== undefined || mouse !== undefined;
  return (
    <Box className="shortcut-list__row">
      <Box as="dt" className="shortcut-list__keys">
        {keys !== undefined && <Shortcut keys={keys} mouse={mouse} size={size} state="idle" />}
        {keys === undefined && mouse !== undefined && <Shortcut mouse={mouse} size={size} state="idle" />}
        {hasKeys && gesture && <Box as="span" className="shortcut__joiner">+</Box>}
        {gesture && <ShortcutGestureCap gesture={gesture} size={size} />}
      </Box>
      <Box as="dd" className="shortcut-list__does">{description}</Box>
    </Box>
  );
};

export { ShortcutListRow };
