/* @layer renderer-components @kind data */
import type { ResolvedEmphasis } from './Emphasis.type';

const EMPHASIS_DEFAULTS: ResolvedEmphasis = {
  trigger: 'hover',
  from: 400,
  to: 800,
  duration: 400,
  stagger: 0,
  anchor: 'center',
  order: 'anchor',
  stable: true,
  className: '',
};

export { EMPHASIS_DEFAULTS };
