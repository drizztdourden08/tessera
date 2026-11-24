/* @layer renderer-components @kind logic */
import type { DropSlotSize } from '../DropSlot.type';

const dropSlotClasses = (size: DropSlotSize, className?: string): string =>
  ['drop-slot', `drop-slot--${size}`, className].filter(Boolean).join(' ');

export { dropSlotClasses };
