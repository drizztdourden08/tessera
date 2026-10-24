/* @layer renderer-components @kind logic */
import type { MarqueeModifiers } from './marquee.type';
import type { ModifierKeys } from './modifiers-of.type';

const modifiersOf = (keys: ModifierKeys): MarqueeModifiers => ({
  add: keys.shiftKey,
  toggle: keys.ctrlKey || keys.metaKey,
});

export { modifiersOf };
