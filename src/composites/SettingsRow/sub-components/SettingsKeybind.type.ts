/* @layer renderer-components @kind types */
import type { ShortcutKey } from '../../../primitives/Shortcut/Shortcut.type';
import type { RenderContext } from '../behavior/renderers.type';

interface SettingsKeybindProps extends RenderContext {
  value: readonly ShortcutKey[];
  onChange: (value: readonly ShortcutKey[]) => void;
}

export type { SettingsKeybindProps };
