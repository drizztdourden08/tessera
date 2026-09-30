/* @layer renderer-components @kind logic */
import { DEFAULT_GRIP_LABEL, DEFAULT_MAIN_LABEL, NO_MODIFIERS } from '../DockLayout.constants';
import type { DockLayoutProps } from '../DockLayout.type';
import type { DockSettings } from './dock-hooks.type';

const dockSettings = (props: DockLayoutProps): DockSettings => ({
  peek: props.peek ?? false,
  modifiers: props.modifiers ?? NO_MODIFIERS,
  externalDrag: props.externalDrag ?? null,
  mainLabel: props.mainLabel ?? DEFAULT_MAIN_LABEL,
  gripLabel: props.gripLabel ?? DEFAULT_GRIP_LABEL,
});

export { dockSettings };
