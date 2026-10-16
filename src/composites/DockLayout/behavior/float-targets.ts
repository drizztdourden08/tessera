/* @layer renderer-components @kind logic */
import type { FloatingWidget, Rect, WidgetId } from '../DockLayout.type';
import { floatingRect } from './floating-rect';

const floatTargets = (stage: Rect, main: Rect, floating: readonly FloatingWidget[], id: WidgetId | null): Rect[] =>
  [stage, main, ...floating.filter((f) => f.id !== id).map((f) => floatingRect(f, main))];

export { floatTargets };
