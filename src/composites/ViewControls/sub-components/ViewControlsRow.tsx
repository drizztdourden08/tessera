/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { FilterBar } from '../../FilterBar';
import { GroupControl } from '../../GroupControl';
import { SortControl } from '../../SortControl';
import type { ViewControlsRowProps } from './ViewControlsRow.type';

const ViewControlsRow = ({ filter, group, sort }: ViewControlsRowProps) => (
  <Box className="view-controls__row">
    {filter !== undefined && <FilterBar {...filter} />}
    {group !== undefined && <GroupControl {...group} />}
    {sort !== undefined && <SortControl {...sort} />}
  </Box>
);

export { ViewControlsRow };
