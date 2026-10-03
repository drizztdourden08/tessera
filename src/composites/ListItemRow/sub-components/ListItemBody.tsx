/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ListItemCell } from './ListItemCell';
import type { ListItemBodyProps } from './ListItemBody.type';

const ListItemBody = ({ name, meta, icon, columns = [] }: ListItemBodyProps) => (
  <>
    {icon != null && <Box className="list-item-row__icon" aria-hidden>{icon}</Box>}
    <ListItemCell main primary={name} secondary={meta} />
    {columns.map((column, index) => <ListItemCell key={index} {...column} />)}
  </>
);

export { ListItemBody };
