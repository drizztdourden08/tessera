/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode, RefObject } from 'react';
import type { ControlSize } from '../../primitives/field-control/field-control.type';

type InlineEditLook = 'field' | 'link';

interface InlineEditProps {
  value: string;
  onCommit: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  validate?: (value: string) => string | undefined;
  multiline?: boolean;
  size?: ControlSize;
  renderValue?: (value: string) => ReactNode;
  look?: InlineEditLook;
  className?: string;
}

interface InlineEditViewProps {
  name: string;
  label: string | undefined;
  value: string;
  placeholder: string | undefined;
  disabled: boolean;
  multiline: boolean;
  renderValue: ((value: string) => ReactNode) | undefined;
  look: InlineEditLook;
  buttonRef: RefObject<HTMLButtonElement | null>;
  className: string | undefined;
  onStart: () => void;
}

interface InlineEditFieldProps {
  name: string;
  value: string;
  placeholder: string | undefined;
  validate: ((value: string) => string | undefined) | undefined;
  multiline: boolean;
  size: ControlSize | undefined;
  className: string | undefined;
  onCommit: (value: string) => void;
  onDone: (focusBack: boolean) => void;
}

interface InlineEditFieldInput {
  value: string;
  validate: ((value: string) => string | undefined) | undefined;
  multiline: boolean;
  onCommit: (value: string) => void;
  onDone: (focusBack: boolean) => void;
}

interface InlineEditFieldState {
  draft: string;
  error: string | undefined;
  setDraft: (draft: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  onBlur: () => void;
}

interface InlineEditing {
  editing: boolean;
  buttonRef: RefObject<HTMLButtonElement | null>;
  start: () => void;
  done: (focusBack: boolean) => void;
}

export type { InlineEditFieldInput, InlineEditFieldProps, InlineEditFieldState, InlineEditing, InlineEditLook, InlineEditProps, InlineEditViewProps };
