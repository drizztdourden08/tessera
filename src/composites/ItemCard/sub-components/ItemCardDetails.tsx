/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import type { ItemCardDetailsProps } from '../ItemCard.type';

const ItemCardDetails = (props: ItemCardDetailsProps) => {
  const { details } = props;
  return (
    <Box className="item-card__details">
      {details.map((detail, index) => (
        <Fragment key={index}>
          {index > 0 && <Span className="item-card__dot" aria-hidden> · </Span>}
          {detail}
        </Fragment>
      ))}
    </Box>
  );
};

export { ItemCardDetails };
