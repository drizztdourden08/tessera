/* @layer renderer-components @kind function */
import type { ToolFramePlacement } from '../ToolFrame.type';

const toolFrameClass = (placement: ToolFramePlacement, shrink: boolean, className: string | undefined): string => [
  'tool-frame',
  placement !== 'top' && `tool-frame--toolbar-${placement}`,
  !shrink && 'tool-frame--rigid',
  className,
].filter(Boolean).join(' ');

export { toolFrameClass };
