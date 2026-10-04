/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type KeyValueKind = 'count' | 'number' | 'text' | 'select';

type KeyValueEntry = string | number;

type KeyValueRecord = Readonly<Record<string, KeyValueEntry>>;

interface KeyValueEditorProps {
  value: KeyValueRecord;
  onChange: (value: Record<string, KeyValueEntry>) => void;
  keys?: readonly string[];
  valueKind?: KeyValueKind;
  options?: readonly string[];
  min?: number;
  max?: number;
  newValue?: KeyValueEntry;
  keyLabel?: string;
  addPlaceholder?: string;
  empty?: ReactNode;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

interface KeyValueRow {
  id: string;
  key: string;
  value: KeyValueEntry;
}

interface KeyValueProblem {
  rows: ReadonlySet<string>;
  message: string | null;
}

interface KeyValueRows {
  rows: readonly KeyValueRow[];
  problem: KeyValueProblem;
  setKey: (id: string, key: string) => void;
  setValue: (id: string, value: KeyValueEntry) => void;
  remove: (id: string) => void;
  add: (key: string) => void;
}

type KeyValueLook = Pick<KeyValueEditorProps, 'keys' | 'valueKind' | 'options' | 'min' | 'max' | 'disabled' | 'keyLabel'>;

interface KeyValueRowProps {
  row: KeyValueRow;
  look: KeyValueLook;
  invalid: boolean;
  onKey: (id: string, key: string) => void;
  onValue: (id: string, value: KeyValueEntry) => void;
  onRemove: (id: string) => void;
}

interface KeyValueValueProps {
  value: KeyValueEntry;
  name: string;
  look: KeyValueLook;
  onChange: (value: KeyValueEntry) => void;
}

interface KeyValueAddProps {
  keys?: readonly string[];
  used: readonly string[];
  placeholder?: string;
  disabled?: boolean;
  onAdd: (key: string) => void;
}

export type {
  KeyValueAddProps, KeyValueEditorProps, KeyValueEntry, KeyValueKind, KeyValueProblem, KeyValueRecord, KeyValueRow,
  KeyValueRowProps, KeyValueRows, KeyValueValueProps,
};
