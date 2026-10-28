/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Box } from '../../../primitives/Box';
import { ToolbarKeyBadge } from './ToolbarKeyBadge';
import type { ToolbarToolDecorProps } from './ToolbarToolDecor.type';
import './ToolbarToolDecor.css';

const ToolbarToolDecor = ({ badge, keyBadge, shortcut, children }: ToolbarToolDecorProps) => {
  const marked = badge === undefined
    ? children
    : <Badge anchor="top-end" value={badge.glyph} label={badge.description} color={badge.color ?? 'info'}>{children}</Badge>;
  if (!keyBadge) return marked;
  return (
    <Box as="span" className="toolbar__keyed">
      {marked}
      <ToolbarKeyBadge shortcut={shortcut} />
    </Box>
  );
};

export { ToolbarToolDecor };
