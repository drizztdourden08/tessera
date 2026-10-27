/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ListItemCell } from './ListItemCell';
import type { ListItemBodyProps } from './ListItemBody.type';

const ListItemBody = ({ name, meta, icon, lead, media, columns = [] }: ListItemBodyProps) => (
  <>
    {media != null && <Box className="list-item-row__media">{media}</Box>}
    {icon != null && lead == null && <Box className="list-item-row__icon" aria-hidden>{icon}</Box>}
    {lead != null && (
      <Box className="list-item-row__icon list-item-row__lead">
        {icon != null && <Box as="span" aria-hidden>{icon}</Box>}
        {lead}
      </Box>
    )}
    <ListItemCell main primary={name} secondary={meta} />
    {columns.map((column, index) => <ListItemCell key={index} {...column} />)}
  </>
);

export { ListItemBody };
