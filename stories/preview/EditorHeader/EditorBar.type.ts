/* @layer stories @kind types */
import type { ReactNode } from 'react';

type SaveStateKind = 'clean' | 'dirty' | 'saving' | 'saved' | 'error';

type EditorBarEdge = 'top' | 'foot';

interface EditorBack {
  label: string;
  onSelect: () => void;
}

interface EditorBarProps {
  state: SaveStateKind;
  name?: string;
  onNameChange?: (name: string) => void;
  nameLabel?: string;
  nameError?: string;
  placeholder?: string;
  context?: readonly ReactNode[];
  error?: string;
  back?: EditorBack;
  actions?: ReactNode;
  edge?: EditorBarEdge;
  className?: string;
}

interface EditorNameProps {
  value: string;
  onChange: (name: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  size?: 'lg' | 'xl';
}

interface SaveStateProps {
  state: SaveStateKind;
  error?: string;
  className?: string;
}

interface EditorContextProps {
  items: readonly ReactNode[];
}

export type { EditorBarEdge, EditorBarProps, EditorContextProps, EditorNameProps, SaveStateKind, SaveStateProps };
