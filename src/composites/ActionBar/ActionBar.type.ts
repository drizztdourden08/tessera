/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ButtonSize } from '../../primitives/Button/Button.type';
import type { IconName } from '../../primitives/Icon';

type ActionKind = 'primary' | 'default' | 'danger';

type ActionBarAlign = 'start' | 'end';

interface ActionConfirm {
  title: string;
  confirmLabel: string;
}

interface ActionItem {
  id: string;
  label: string;
  icon?: IconName;
  onSelect: () => void;
  kind?: ActionKind;
  disabled?: boolean;
  confirm?: ActionConfirm;
}

interface ActionBarProps {
  actions: readonly ActionItem[];
  size?: ButtonSize;
  keep?: number;
  overflowLabel?: string;
  align?: ActionBarAlign;
  label?: string;
  className?: string;
}

interface ActionSplit {
  primary: readonly ActionItem[];
  shown: readonly ActionItem[];
  folded: readonly ActionItem[];
}

interface ActionBarButtonProps {
  action: ActionItem;
  size: ButtonSize;
  onPress?: (action: ActionItem) => void;
}

interface ActionBarAskProps {
  action: ActionItem;
  confirm: ActionConfirm;
  onConfirm: () => void;
  onCancel: () => void;
}

interface ActionBarMoreProps {
  folded: readonly ActionItem[];
  size: ButtonSize;
  label: string;
  asks: (action: ActionItem) => boolean;
  onPress: (action: ActionItem) => void;
}

interface ActionBarMeasureProps {
  measureRef: RefObject<HTMLDivElement | null>;
  rest: readonly ActionItem[];
  primary: readonly ActionItem[];
  size: ButtonSize;
  label: string;
}

export type {
  ActionBarAlign, ActionBarAskProps, ActionBarButtonProps, ActionBarMeasureProps, ActionBarMoreProps, ActionBarProps, ActionConfirm,
  ActionItem, ActionKind, ActionSplit,
};
