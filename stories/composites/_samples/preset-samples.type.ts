/* @layer stories @kind types */
import type { MasterDetailGuardLook } from '../../../src/composites';

interface SamplePreset {
  id: string;
  name: string;
  game: string;
  changes: number;
  edited?: string;
  missing?: boolean;
  tower: number;
  ganon: number;
}

type ManagedListDemoState = 'ready' | 'loading' | 'empty' | 'error';

interface ManagedListDemoProps {
  state?: ManagedListDemoState;
  grouped?: boolean;
  filter?: boolean;
  actions?: boolean;
  title?: string;
  createLabel?: string;
}

interface PresetsDemoProps {
  guard?: MasterDetailGuardLook;
  narrow?: boolean;
  startDirty?: boolean;
  startEmpty?: boolean;
}

interface PresetEditorProps {
  preset: SamplePreset;
  dirty: boolean;
  onChange: (patch: Partial<SamplePreset>) => void;
  onSave: () => void;
}

export type { ManagedListDemoProps, ManagedListDemoState, PresetEditorProps, PresetsDemoProps, SamplePreset };
