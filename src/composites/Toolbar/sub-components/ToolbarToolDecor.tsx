/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import type { ToolbarToolDecorProps } from './ToolbarToolDecor.type';
import './ToolbarToolDecor.css';

const ToolbarToolDecor = ({ badge, children }: ToolbarToolDecorProps) => {
  if (badge === undefined) return children;
  return <Badge anchor="top-end" value={badge.glyph} label={badge.description} color={badge.color ?? 'info'}>{children}</Badge>;
};

export { ToolbarToolDecor };
