/* @layer renderer-components @kind types */
import type { DropSlotProps } from '../DropSlot.type';

interface DropSlotBodyProps {
  holds: boolean;
  label: string;
  clearLabel: string;
  disabled?: boolean;
  children?: DropSlotProps['children'];
  onClear?: () => void;
}

export type { DropSlotBodyProps };
