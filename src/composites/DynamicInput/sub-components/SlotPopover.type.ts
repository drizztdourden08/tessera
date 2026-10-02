/* @layer renderer-components @kind types */
import type { ReactNode, RefObject } from 'react';
import type { PatternField } from '../behavior/pattern-field.type';

type SlotPopoverVariant = 'panel' | 'list' | 'color';

interface SlotPopoverProps {
  field: PatternField;
  anchorRef: RefObject<HTMLElement | null>;
  variant: SlotPopoverVariant;
  children: ReactNode;
}

export type { SlotPopoverProps };
