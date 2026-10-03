/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { FilterClause } from '../../../data/filter/clause';

interface ValuePopoverProps {
  field: FieldDescriptor;
  clause: FilterClause;
  anchorRef: RefObject<HTMLElement | null>;
  onChange: (nextValue: unknown) => void;
  onClose: () => void;
}

export type { ValuePopoverProps };
