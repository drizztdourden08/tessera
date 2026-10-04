/* @layer renderer-components @kind types */
import type { DragEvent } from 'react';

type PathKind = 'file' | 'folder' | 'any';

type PathBrowse = () => string | null | void | Promise<string | null | void>;

type PathProblem = 'file' | 'folder' | 'type';

interface PathFieldProps {
  value: string | null;
  onChange?: (path: string | null) => void;
  onBrowse?: PathBrowse;
  onReveal?: (path: string) => void;
  kind?: PathKind;
  accept?: readonly string[];
  resolvePath?: (file: File) => string | null | undefined;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  copyable?: boolean;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  className?: string;
}

interface PathDropRules {
  kind: PathKind;
  accept?: readonly string[];
  resolvePath?: (file: File) => string | null | undefined;
}

type PathDropResult = { path: string; problem?: never } | { problem: PathProblem; path?: never } | null;

interface PathDrop {
  dropping: boolean;
  problem: PathProblem | null;
  clearProblem: () => void;
  handlers: {
    onDragEnter: (event: DragEvent<HTMLElement>) => void;
    onDragOver: (event: DragEvent<HTMLElement>) => void;
    onDragLeave: (event: DragEvent<HTMLElement>) => void;
    onDrop: (event: DragEvent<HTMLElement>) => void;
  };
}

interface PathFieldShownProps {
  path: string;
}

interface PathFieldToolsProps {
  value: string | null;
  kind: PathKind;
  editable: boolean;
  disabled: boolean;
  copyable: boolean;
  onClear: () => void;
  onReveal?: (path: string) => void;
}

interface PathFieldView {
  kind: PathKind;
  editable: boolean;
  disabled: boolean;
  invalid: boolean;
  masked: boolean;
  drop: PathDrop;
  words: { placeholder: string; drop: string; problem: string | null };
  inputId: string | undefined;
  labelId: string | undefined;
  describedBy: string | undefined;
  problemId: string;
  setFocused: (focused: boolean) => void;
  change: (text: string) => void;
  clear: () => void;
  browse: (() => void) | undefined;
}

interface PathFieldInputProps {
  view: PathFieldView;
  value: string | null;
  label?: string;
}

export type {
  PathBrowse, PathDrop, PathDropResult, PathDropRules, PathFieldProps, PathFieldInputProps, PathFieldShownProps, PathFieldToolsProps, PathFieldView,
  PathKind, PathProblem,
};
