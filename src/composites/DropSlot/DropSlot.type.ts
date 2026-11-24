/* @layer renderer-components @kind types */
import type { DragEvent, ReactNode } from 'react';

type DropSlotSize = 'sm' | 'md' | 'lg';

interface DropSlotProps {
  label: string;
  children?: ReactNode;
  filled?: boolean;
  size?: DropSlotSize;
  accept?: string;
  clearLabel?: string;
  disabled?: boolean;
  onDrop?: (payload: string, event: DragEvent<HTMLElement>) => void;
  onClear?: () => void;
  onPick?: () => void;
  className?: string;
}

export type { DropSlotProps, DropSlotSize };
