/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FieldNoteProps {
  id: string;
  hint?: ReactNode;
  error?: ReactNode;
}

export type { FieldNoteProps };
