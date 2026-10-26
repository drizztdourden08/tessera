/* @layer renderer-components @kind component */
import { GripHeaderCell } from './GripHeaderCell';
import { SelectAllCell } from './SelectAllCell';
import type { HeaderLeadProps } from './HeaderLead.type';

const HeaderLead = ({ reorderable, selection }: HeaderLeadProps) => (
  <>
    {reorderable && <GripHeaderCell />}
    {selection?.selectable && <SelectAllCell selection={selection} />}
  </>
);

export { HeaderLead };
