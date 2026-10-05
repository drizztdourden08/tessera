/* @layer stories @kind types */
import type { ListDetailGuardLook, SaveBarState } from '../../../src/composites';

type PresetGoal = 'ganon' | 'triforce' | 'pedestal';

type PresetPool = 'normal' | 'hard' | 'expert';

interface PresetOptions {
  tower: number;
  ganon: number;
  goal: PresetGoal;
  keysanity: boolean;
  pool: PresetPool;
  balancing: number;
}

interface SamplePreset extends PresetOptions {
  id: string;
  name: string;
  game: string;
  notes: string;
  changes: number;
  edited?: string;
  missing?: boolean;
}

type ItemListDemoState = 'ready' | 'loading' | 'empty' | 'error';

interface ItemListDemoProps {
  state?: ItemListDemoState;
  grouped?: boolean;
  filter?: boolean;
  actions?: boolean;
  title?: string;
  createLabel?: string;
}

interface PresetsDemoProps {
  guard?: ListDetailGuardLook;
  narrow?: boolean;
  tall?: boolean;
  startCollapsed?: boolean;
  startDirty?: boolean;
  startEmpty?: boolean;
}

interface PresetRowsProps {
  preset: SamplePreset;
  onChange: (patch: Partial<SamplePreset>) => void;
}

interface PresetEditorProps extends PresetRowsProps {
  state: SaveBarState;
  error?: string;
  onSave: () => void;
  onDiscard: () => void;
}

export type {
  ItemListDemoProps, ItemListDemoState, PresetEditorProps, PresetGoal, PresetOptions, PresetPool, PresetRowsProps, PresetsDemoProps, SamplePreset,
};
