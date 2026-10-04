/* @layer renderer-components @kind types */
import type { ShortcutKey } from '../../../primitives/Shortcut/Shortcut.type';

interface DragGhostKeyProps {
  keys: ShortcutKey;
  does: string;
  lit: boolean;
}

export type { DragGhostKeyProps };
