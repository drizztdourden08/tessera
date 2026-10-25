/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { ItemCardHeadProps } from '../ItemCard.type';

const ItemCardHead = (props: ItemCardHeadProps) => {
  const { tile, children } = props;
  return (
    <Box className="item-card__head">
      {tile}
      <Box className="item-card__heading">{children}</Box>
    </Box>
  );
};

export { ItemCardHead };
