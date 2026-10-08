/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

type DropZoneVariant = 'block' | 'inline';

type DropZoneTone = 'success' | 'error';

interface DropZoneStatus {
  tone: DropZoneTone;
  message: ReactNode;
}

interface DropZoneProps {
  accept?: string[];
  label?: string;
  hint?: string;
  disabled?: boolean;
  variant?: DropZoneVariant;
  size?: ControlSize;
  icon?: ReactNode;
  status?: DropZoneStatus;
  onDrop: (files: File[]) => void;
}

export type {
  DropZoneProps,
  DropZoneStatus,
  DropZoneTone,
  DropZoneVariant,
};
