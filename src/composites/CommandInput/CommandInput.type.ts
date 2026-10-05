/* @layer renderer-components @kind types */
import type { KeyboardEventHandler, ReactNode } from 'react';
import type { ComboboxKeyHandler } from '../../primitives/Combobox/Combobox.type';
import type { ControlSize } from '../../primitives/field-control/field-control.type';

type CommandSubmit = (command: string) => boolean | void;

interface CommandEntry {
  command: string;
  description?: string;
}

type CommandOption = string | CommandEntry;

interface CommandInputProps {
  onSubmit: CommandSubmit;
  history?: readonly string[];
  commands?: readonly CommandOption[];
  maxSuggestions?: number;
  storageKey?: string;
  historyLimit?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  sendLabel?: string;
  actions?: ReactNode;
  keyHints?: boolean;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  size?: ControlSize;
  id?: string;
  className?: string;
  'aria-describedby'?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

interface HistoryWalk {
  index: number | null;
  draft: string;
}

interface HistoryStep {
  walk: HistoryWalk;
  value: string;
}

type CommandKeyAction = 'send' | 'older' | 'newer' | 'clear' | null;

type SuggestKeyAction = 'complete' | 'list' | null;

interface CommandKeyEvent {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  isComposing: boolean;
}

type CommandState = Pick<
  CommandInputProps, 'onSubmit' | 'history' | 'commands' | 'maxSuggestions' | 'storageKey' | 'historyLimit' | 'value' | 'defaultValue' | 'onValueChange'
>;

interface CommandControl {
  value: string;
  ready: boolean;
  known: boolean;
  hits: readonly CommandEntry[];
  change: (value: string) => void;
  complete: (command: string | null) => void;
  send: () => void;
  onKeyDown: ComboboxKeyHandler<CommandEntry>;
}

interface CommandInputRowProps {
  command: CommandControl;
  size: ControlSize;
  sendLabel?: string;
  field: Pick<CommandInputProps, 'label' | 'placeholder' | 'disabled' | 'invalid' | 'id' | 'onKeyDown'> & { describedBy?: string };
}

export type {
  CommandControl, CommandEntry, CommandInputProps, CommandInputRowProps, CommandKeyAction, CommandKeyEvent, CommandOption, CommandState, CommandSubmit,
  HistoryStep, HistoryWalk, SuggestKeyAction,
};
