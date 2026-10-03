/* @layer renderer-components @kind logic */
import type { ResolvedEmphasis } from '../Emphasis.type';

const emphasisClass = (resolved: ResolvedEmphasis, active: boolean): string => [
  'emphasis',
  `emphasis--${resolved.trigger}`,
  `emphasis--anchor-${resolved.anchor}`,
  resolved.trigger === 'active' && active ? 'emphasis--on' : '',
  resolved.stable ? 'emphasis--stable' : '',
  resolved.className,
].filter(Boolean).join(' ');

export { emphasisClass };
