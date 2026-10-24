/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../primitives/Icon';
import type { ReorderDrag } from '../reorder/reorder.type';

type ReorderToggleState = Readonly<Record<string, boolean>>;

interface ReorderToggle {
  id: string;
  iconOn: IconName;
  iconOff: IconName;
  label: string;
}

interface ReorderItem {
  id: string;
  label: string;
  icon?: IconName;
  media?: ReactNode;
  toggles?: ReorderToggleState;
}

interface ReorderListProps {
  label: string;
  items: readonly ReorderItem[];
  toggles?: readonly ReorderToggle[];
  selectedId?: string;
  mediaAspect?: number;
  mediaWidth?: number;
  onSelect?: (id: string) => void;
  onActivate?: (id: string) => void;
  onRename?: (id: string, name: string) => void;
  onMove: (from: number, to: number) => void;
  onToggle?: (itemId: string, toggleId: string, next: boolean) => void;
  empty?: ReactNode;
  className?: string;
}

interface ReorderKeysInput {
  items: readonly ReorderItem[];
  move: (from: number, to: number) => void;
  rename?: (id: string) => void;
  activate?: (id: string) => void;
}

interface ReorderRowCan {
  rename: boolean;
  activate: boolean;
}

type ReorderRowAction = 'rename' | 'activate';

interface ReorderDoubleClickHit {
  main: boolean;
  label: boolean;
}

interface ReorderRowEdit {
  renaming: boolean;
  can: ReorderRowCan;
  onRenameStart: (id: string) => void;
  onRenameEnd: (id: string, name: string | null) => void;
  onActivate?: (id: string) => void;
}

interface ReorderRenameProps {
  name: string;
  onEnd: (name: string | null) => void;
}

interface ReorderRowProps {
  item: ReorderItem;
  index: number;
  total: number;
  toggles: readonly ReorderToggle[];
  selected: boolean;
  tabbable: boolean;
  drag: ReorderDrag;
  edit: ReorderRowEdit;
  mediaAspect?: number;
  mediaWidth?: number;
  onSelect?: (id: string) => void;
  onToggle?: (itemId: string, toggleId: string, next: boolean) => void;
}

interface ReorderGripProps {
  index: number;
  drag: ReorderDrag;
}

interface ReorderTogglesProps {
  name: string;
  toggles: readonly ReorderToggle[];
  state: ReorderToggleState | undefined;
  onToggle: (toggleId: string, next: boolean) => void;
}

export type {
  ReorderDoubleClickHit, ReorderGripProps, ReorderItem, ReorderKeysInput, ReorderListProps, ReorderRenameProps, ReorderRowAction,
  ReorderRowCan, ReorderRowProps, ReorderToggle, ReorderToggleState, ReorderTogglesProps,
};
