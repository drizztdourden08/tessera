/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

type JsonShape = 'object' | 'array' | 'any';

type JsonReason =
  | 'empty' | 'value' | 'unclosed' | 'escape' | 'control' | 'number' | 'key' | 'colon' | 'objectNext' | 'arrayNext'
  | 'trailingComma' | 'extra' | 'wantObject' | 'wantArray';

interface JsonFault {
  at: number;
  reason: JsonReason;
}

interface JsonCursor {
  text: string;
  at: number;
  fault: JsonFault | null;
}

interface JsonProblem {
  reason: JsonReason;
  offset: number;
  line: number;
  column: number;
  message: string;
}

type JsonCheck = { value: unknown; fault: null } | { value?: never; fault: JsonFault };

interface JsonInputProps {
  value: unknown;
  onChange: (value: unknown) => void;
  onProblem?: (problem: JsonProblem | null) => void;
  shape?: JsonShape;
  defaultText?: string;
  indent?: number;
  readOnly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  className?: string;
}

interface JsonText {
  text: string;
  edit: (text: string) => void;
  format: (() => void) | undefined;
  problem: JsonProblem | null;
  value: unknown;
}

interface JsonEditorProps {
  text: string;
  errorLine: number | undefined;
  inputRef?: RefObject<HTMLTextAreaElement | null>;
  textarea: {
    id?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    onChange: (text: string) => void;
  };
}

interface JsonFootProps {
  id: string;
  problem: JsonProblem | null;
  value: unknown;
  onFormat?: () => void;
  disabled?: boolean;
}

export type {
  JsonCheck, JsonCursor, JsonEditorProps, JsonFault, JsonFootProps, JsonInputProps, JsonProblem, JsonReason, JsonShape, JsonText,
};
