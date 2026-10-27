/* @layer renderer-components @kind logic */
import type { MouseEvent, SyntheticEvent } from 'react';
import { guardCellControl } from '../../dom/guard-cell-control';
import type { DisclosureHandlers } from '../Disclosure.type';

const openOf = (event: SyntheticEvent<HTMLElement>): boolean => (event.currentTarget as HTMLDetailsElement).open;

const disclosureHandlers = (open: boolean | undefined, onOpenChange: ((open: boolean) => void) | undefined): DisclosureHandlers => {
  if (open === undefined) {
    return { onToggle: onOpenChange ? (event) => onOpenChange(openOf(event)) : undefined };
  }
  return {
    onToggle: (event) => {
      const now = openOf(event);
      if (now !== open) onOpenChange?.(now);
    },
    onSummaryClick: guardCellControl((event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onOpenChange?.(!open);
    }),
  };
};

export { disclosureHandlers };
