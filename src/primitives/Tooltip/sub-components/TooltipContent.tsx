/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { Shortcut, shortcutKeys } from '../../Shortcut';
import { Small, Strong } from '../../text-elements';
import type { TooltipContentProps } from './TooltipContent.type';

const TooltipContent = (props: TooltipContentProps) => {
  const { name, description, shortcut } = props;
  const keys = shortcut === undefined ? [] : shortcutKeys(shortcut);
  return (
    <Box className="tooltip-content">
      <Strong>{name}</Strong>
      {description && <Small tone="dim">{description}</Small>}
      {keys.length > 0 && <Shortcut keys={keys} size="xs" />}
    </Box>
  );
};

export { TooltipContent };
