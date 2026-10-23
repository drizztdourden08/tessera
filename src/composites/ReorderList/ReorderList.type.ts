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
  toggles?: ReorderToggleState;
}

interface ReorderListProps {
  label: string;
  items: readonly ReorderItem[];
  toggles?: readonly ReorderToggle[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onMove: (from: number, to: number) => void;
  onToggle?: (itemId: string, toggleId: string, next: boolean) => void;
  empty?: ReactNode;
  className?: string;
}

interface MoveFocus {
  message: string;
  announce: (message: string) => void;
  expect: (id: string) => void;
}

interface ReorderKeysInput {
  items: readonly ReorderItem[];
  move: (from: number, to: number) => void;
}

interface ReorderRowProps {
  item: ReorderItem;
  index: number;
  total: number;
  toggles: readonly ReorderToggle[];
  selected: boolean;
  tabbable: boolean;
  drag: ReorderDrag;
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
  MoveFocus, ReorderGripProps, ReorderItem, ReorderKeysInput, ReorderListProps, ReorderRowProps, ReorderToggle, ReorderToggleState,
  ReorderTogglesProps,
};
