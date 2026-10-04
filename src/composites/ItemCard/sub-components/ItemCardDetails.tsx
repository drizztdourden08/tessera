/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { Paragraph, Span } from '../../../primitives/text-elements';
import type { ItemCardDetailsProps } from '../ItemCard.type';

const ItemCardDetails = (props: ItemCardDetailsProps) => {
  const { details } = props;
  return (
    <Paragraph className="item-card__details">
      {details.map((detail, index) => (
        <Fragment key={index}>
          {index > 0 && <Span className="item-card__dot" aria-hidden> · </Span>}
          {detail}
        </Fragment>
      ))}
    </Paragraph>
  );
};

export { ItemCardDetails };
