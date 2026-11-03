/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { ListboxView } from '../../../primitives/listbox/listbox-view.type';
import type { PatternField } from '../behavior/pattern-field.type';
import type { PatternChoice } from '../DynamicInput.type';

interface ChoiceListPopoverProps {
  field: PatternField;
  anchorRef: RefObject<HTMLElement | null>;
  label: string;
  view: ListboxView<PatternChoice>;
}

export type { ChoiceListPopoverProps };
