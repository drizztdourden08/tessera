/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Status } from '../../../primitives/Status';
import { Span } from '../../../primitives/text-elements';
import type { ItemCardTopProps } from '../ItemCard.type';

const ItemCardTop = (props: ItemCardTopProps) => {
  const { eyebrow, status } = props;
  if (!eyebrow && !status) return null;
  return (
    <Box className="item-card__top">
      <Span className="item-card__eyebrow">{eyebrow}</Span>
      {status && <Status tone={status.tone} dot>{status.label}</Status>}
    </Box>
  );
};

export { ItemCardTop };
