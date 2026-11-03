/* @layer renderer-components @kind types */
import type { VirtualAxis } from '../../virtual';

interface ListBodyProps {
  role: 'listbox' | 'list';
  'aria-multiselectable'?: true;
  'aria-orientation'?: VirtualAxis;
}

export type { ListBodyProps };
