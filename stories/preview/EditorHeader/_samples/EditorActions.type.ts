/* @layer stories @kind types */
import type { SaveStateKind } from '../EditorBar.type';

interface EditorActionsProps {
  state: SaveStateKind;
  onSave: () => void;
  onReset: () => void;
}

interface SessionActionsProps {
  onRun?: () => void;
}

export type { EditorActionsProps, SessionActionsProps };
