/* @layer renderer-components @kind types */
import type { KeyboardEventHandler, ReactNode } from 'react';
import type { ComboboxKeyHandler } from '../../primitives/Combobox/Combobox.type';
import type { ControlSize } from '../../primitives/field-control/field-control.type';
import type { MenuItemIcon } from '../DropdownMenu';
import type { PatternSetup } from '../DynamicInput';

type CommandSubmit = (command: string) => boolean | void;

interface CommandEntry {
  command: string;
  description?: string;
}

type CommandOption = string | CommandEntry;

type CommandParamKind = 'text' | 'number' | 'choice' | 'boolean';

type CommandValue = string | number | boolean;

type CommandValues = Readonly<Record<string, CommandValue>>;

type CommandParamOptions = readonly string[] | ((values: CommandValues) => readonly string[]);

interface CommandParam {
  name: string;
  label: string;
  kind: CommandParamKind;
  options?: CommandParamOptions;
  placeholder?: string;
  dependsOn?: string;
  optional?: boolean;
}

interface CommandSpecBase {
  id: string;
  label: string;
  icon: MenuItemIcon;
  group?: string;
  description?: string;
}

interface CommandFieldsSpec extends CommandSpecBase {
  params: readonly CommandParam[];
  format: (values: CommandValues) => string;
  pattern?: undefined;
  setup?: undefined;
}

interface CommandPatternSpec extends CommandSpecBase {
  pattern: string;
  setup?: PatternSetup;
  format?: (values: CommandValues) => string;
  params?: undefined;
}

type CommandSpec = CommandFieldsSpec | CommandPatternSpec;

interface CommandInputProps {
  onSubmit: CommandSubmit;
  history?: readonly string[];
  commands?: readonly CommandOption[];
  commandSpecs?: readonly CommandSpec[];
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

interface CommandSpecControl {
  spec: CommandSpec | null;
  values: CommandValues;
  text: string;
  ready: boolean;
  blank: boolean;
  pick: (id: string) => void;
  clear: () => void;
  reset: () => void;
  setValue: (name: string, value: CommandValue | undefined) => void;
  setValues: (values: CommandValues) => void;
}

interface CommandSpecState {
  id: string | null;
  values: CommandValues;
}

type CommandSpecKeyAction = 'send' | 'clear' | null;

interface CommandSpecParamProps {
  param: CommandParam;
  values: CommandValues;
  value: CommandValue | undefined;
  size: ControlSize;
  disabled: boolean;
  onValue: (name: string, value: CommandValue | undefined) => void;
}

interface CommandSpecFieldsProps {
  spec: CommandFieldsSpec;
  values: CommandValues;
  size: ControlSize;
  disabled: boolean;
  onValue: (name: string, value: CommandValue | undefined) => void;
}

interface CommandSpecPickerProps {
  specs: readonly CommandSpec[];
  size: ControlSize;
  disabled: boolean;
  onPick: (id: string) => void;
}

interface CommandSpecRowProps {
  command: CommandControl;
  specs: CommandSpecControl;
  picker: ReactNode;
  size: ControlSize;
  disabled: boolean;
}

type CommandLineState = CommandState & Pick<CommandInputProps, 'commandSpecs'>;

interface CommandInputRowProps {
  command: CommandControl;
  size: ControlSize;
  sendLabel?: string;
  picker?: ReactNode;
  field: Pick<CommandInputProps, 'label' | 'placeholder' | 'disabled' | 'invalid' | 'id' | 'onKeyDown'> & { describedBy?: string };
}

interface CommandInputLineProps extends CommandInputRowProps {
  specs: CommandSpecControl;
  commandSpecs?: readonly CommandSpec[];
}

export type {
  CommandControl, CommandEntry, CommandFieldsSpec, CommandInputLineProps, CommandInputProps, CommandInputRowProps, CommandLineState, CommandKeyAction, CommandKeyEvent, CommandOption, CommandParam, CommandParamKind, CommandParamOptions,
  CommandPatternSpec, CommandSpec, CommandSpecControl, CommandSpecFieldsProps, CommandSpecKeyAction, CommandSpecParamProps, CommandSpecPickerProps, CommandSpecRowProps, CommandSpecState,
  CommandState, CommandSubmit, CommandValue, CommandValues, HistoryStep, HistoryWalk, SuggestKeyAction,
};
