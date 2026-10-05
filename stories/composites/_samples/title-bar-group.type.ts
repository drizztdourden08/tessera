/* @layer stories @kind types */
import type { WindowTitleBarDropdownAction } from '../../../src/composites';

type TitleBarGroupLook = Pick<WindowTitleBarDropdownAction, 'tone' | 'effect'>;

interface TitleBarGroupState {
  group: number;
  sync: boolean;
  syncing: boolean;
  onGroup: (group: number) => void;
  onSync: () => void;
  onBug: () => void;
  onSaves: () => void;
}

export type { TitleBarGroupLook, TitleBarGroupState };
