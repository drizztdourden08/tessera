/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type DropZoneVariant = 'block' | 'inline';

interface DropZoneProps {
  accept?: string[];
  label?: string;
  hint?: string;
  disabled?: boolean;
  variant?: DropZoneVariant;
  icon?: ReactNode;
  onDrop: (files: File[]) => void;
}

export type {
  DropZoneProps,
  DropZoneVariant,
};
