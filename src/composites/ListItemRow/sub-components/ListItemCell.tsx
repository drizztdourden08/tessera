/* @layer renderer-components @kind component */
import type { ReactNode } from 'react';
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import type { ListItemCellProps } from './ListItemCell.type';

const titleOf = (text: ReactNode): string | undefined => (typeof text === 'string' ? text : undefined);

const ListItemCell = (props: ListItemCellProps) => {
  const { primary, secondary, align = 'start', main = false } = props;
  const base = main ? 'list-item-row__cell list-item-row__cell--main' : 'list-item-row__cell';
  return (
    <Box className={`${base} list-item-row__cell--${align}`}>
      <Span className="list-item-row__primary" title={titleOf(primary)}>{primary}</Span>
      {secondary != null && <Span tone="muted" className="list-item-row__secondary" title={titleOf(secondary)}>{secondary}</Span>}
    </Box>
  );
};

export { ListItemCell };
