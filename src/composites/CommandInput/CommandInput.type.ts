/* @layer renderer-components @kind types */
import type { InputHTMLAttributes, KeyboardEvent, KeyboardEventHandler, ReactNode } from 'react';
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { TextInputProps } from '../../primitives/TextInput/TextInput.type';

type CommandSubmit = (command: string) => boolean | void;

interface CommandInputProps extends Omit<TextInputProps, 'value' | 'defaultValue' | 'onChange' | 'onEnter' | 'onSubmit' | 'start' | 'end'> {
  onSubmit: CommandSubmit;
  history?: readonly string[];
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

interface CommandKeyEvent {
  key: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  isComposing: boolean;
}

type CommandState = Pick<CommandInputProps, 'onSubmit' | 'history' | 'storageKey' | 'historyLimit' | 'value' | 'defaultValue' | 'onValueChange'>;

interface CommandControl {
  value: string;
  ready: boolean;
  change: (value: string) => void;
  send: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
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

export type { CommandControl, CommandInputProps, CommandInputRowProps, CommandKeyAction, CommandKeyEvent, CommandState, CommandSubmit, HistoryStep, HistoryWalk };
