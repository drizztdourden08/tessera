/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { Shortcut, shortcutRows } from '../../Shortcut';
import { Small, Strong } from '../../text-elements';
import type { TooltipContentProps } from './TooltipContent.type';

const TooltipContent = (props: TooltipContentProps) => {
  const { name, description, shortcut } = props;
  const rows = (shortcut === undefined ? [] : shortcutRows(shortcut)).filter((row) => row.keys.length > 0);
  return (
    <Box className="tooltip-content">
      <Strong>{name}</Strong>
      {description && <Small tone="dim">{description}</Small>}
      {rows.map((row, index) => (
        <Box key={row.label ?? index} className="tooltip-content__row">
          {row.label !== undefined && <Small tone="dim">{row.label}</Small>}
          <Shortcut keys={row.keys} size="xs" />
        </Box>
      ))}
    </Box>
  );
};

export { TooltipContent };
