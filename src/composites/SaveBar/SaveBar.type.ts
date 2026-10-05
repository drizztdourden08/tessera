/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type SaveBarState = 'clean' | 'dirty' | 'saving' | 'saved' | 'error';

interface SaveBarProps {
  state: SaveBarState;
  error?: ReactNode;
  onSave: () => void;
  onDiscard?: () => void;
  saveLabel?: string;
  discardLabel?: string;
  className?: string;
}

interface SaveBarStatusProps {
  state: SaveBarState;
  error?: ReactNode;
}

export type { SaveBarProps, SaveBarState, SaveBarStatusProps };
