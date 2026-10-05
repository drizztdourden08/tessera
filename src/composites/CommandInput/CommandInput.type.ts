/* @layer renderer-components @kind types */
import type { InputHTMLAttributes, KeyboardEvent, KeyboardEventHandler, ReactNode } from 'react';
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { ListboxDrop } from '../../primitives/listbox/listbox-drop.type';
import type { TextInputProps } from '../../primitives/TextInput/TextInput.type';

type CommandSubmit = (command: string) => boolean | void;

interface CommandEntry {
  command: string;
  description?: string;
}

type CommandOption = string | CommandEntry;

interface CommandInputProps extends Omit<TextInputProps, 'value' | 'defaultValue' | 'onChange' | 'onEnter' | 'onSubmit' | 'start' | 'end'> {
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

type SuggestKeyAction = 'next' | 'previous' | 'complete' | 'close' | null;

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

interface CommandSuggest {
  known: boolean;
  hits: readonly CommandEntry[];
  open: boolean;
  active: number;
  listId: string;
  optionId: (index: number) => string;
  drop: ListboxDrop<HTMLDivElement>;
  move: (step: 1 | -1) => void;
  point: (index: number) => void;
  dismiss: () => void;
  reset: () => void;
  setFocused: (focused: boolean) => void;
}

interface CommandControl {
  value: string;
  ready: boolean;
  suggest: CommandSuggest;
  change: (value: string) => void;
  complete: (entry: CommandEntry) => void;
  send: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

interface CommandSuggestParams {
  commands: readonly CommandOption[] | undefined;
  limit: number;
  value: string;
  walking: boolean;
}

interface CommandSuggestionsProps {
  suggest: CommandSuggest;
  query: string;
  size: ControlSize;
  label: string;
  onPick: (entry: CommandEntry) => void;
}

interface CommandInputRowProps {
  command: CommandControl;
  size: ControlSize;
  label?: string;
  sendLabel?: string;
  describedBy?: string;
  disabled?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  field: Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange' | 'onSubmit'> & { invalid?: boolean };
}

export type {
  CommandControl, CommandEntry, CommandInputProps, CommandInputRowProps, CommandKeyAction, CommandKeyEvent, CommandOption, CommandState, CommandSubmit,
  CommandSuggest, CommandSuggestParams, CommandSuggestionsProps, HistoryStep, HistoryWalk, SuggestKeyAction,
};
