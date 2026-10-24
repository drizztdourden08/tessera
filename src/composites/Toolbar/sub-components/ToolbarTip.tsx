/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Shortcut } from '../../../primitives/Shortcut';
import { Small, Strong } from '../../../primitives/text-elements';
import { menuShortcutKeys } from '../../DropdownMenu/behavior/menu-shortcut-keys';
import type { ToolbarTipProps } from './ToolbarTip.type';

const ToolbarTip = (props: ToolbarTipProps) => {
  const { name, description, shortcut } = props;
  const keys = shortcut === undefined ? [] : menuShortcutKeys(shortcut);
  return (
    <Box className="toolbar-tip">
      <Strong>{name}</Strong>
      {description && <Small tone="dim">{description}</Small>}
      {keys.length > 0 && <Shortcut keys={keys} size="xs" />}
    </Box>
  );
};

export { ToolbarTip };
