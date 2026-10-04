/* @layer stories @kind types */
interface TitleBarGroupState {
  group: number;
  sync: boolean;
  syncing: boolean;
  onGroup: (group: number) => void;
  onSync: () => void;
  onBug: () => void;
  onSaves: () => void;
}

export type { TitleBarGroupState };
