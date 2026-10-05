/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import { FLOAT_MIN, NO_MODIFIERS } from '../DockLayout.constants';
import type { DockLayoutProps } from '../DockLayout.type';
import type { DockSettings } from './dock-hooks.type';

const dockSettings = (props: DockLayoutProps, strings: TesseraStrings['widgets']): DockSettings => ({
  peek: props.peek ?? false,
  modifiers: props.modifiers ?? NO_MODIFIERS,
  externalDrag: props.externalDrag ?? null,
  mainLabel: props.mainLabel ?? strings.mainView,
  gripLabel: props.gripLabel ?? strings.gripLabel,
  mainGrip: props.mainGrip ?? 'always',
  floatingMin: props.floatingMin ?? FLOAT_MIN,
});

export { dockSettings };
