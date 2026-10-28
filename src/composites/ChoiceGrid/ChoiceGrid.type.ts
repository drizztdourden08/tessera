/* @layer renderer-components @kind types */
import type { MouseEventHandler, ReactNode } from 'react';

type ChoiceRole = 'radiogroup' | 'listbox';

interface ChoiceCell<T extends string = string> {
  value: T;
  label: string;
  content?: ReactNode;
  disabled?: boolean;
}

interface ChoiceSection<T extends string = string> {
  id: string;
  label?: string;
  cells: readonly ChoiceCell<T>[];
}

interface ChoiceCellProps {
  role: 'radio' | 'option';
  'aria-label': string;
  'aria-checked'?: boolean;
  'aria-selected'?: boolean;
  tabIndex: 0 | -1;
  disabled: boolean;
  'data-choice-index': number;
  onClick: MouseEventHandler<HTMLElement>;
  onFocus: () => void;
}

interface ChoiceCellState {
  selected: boolean;
  props: ChoiceCellProps;
}

interface ChoiceGridProps<T extends string = string> {
  label: string;
  value?: T | null;
  onChange: (value: T) => void;
  cells?: readonly ChoiceCell<T>[];
  sections?: readonly ChoiceSection<T>[];
  columns?: number;
  role?: ChoiceRole;
  pickOnRelease?: boolean;
  renderCell?: (cell: ChoiceCell<T>, state: ChoiceCellState) => ReactNode;
  footer?: ReactNode;
  className?: string;
}

export type { ChoiceCell, ChoiceCellProps, ChoiceCellState, ChoiceGridProps, ChoiceRole, ChoiceSection };
