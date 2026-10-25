/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { ItemCardBodyProps } from '../ItemCard.type';
import { ItemCardFoot } from './ItemCardFoot';
import { ItemCardHead } from './ItemCardHead';
import { ItemCardTitle } from './ItemCardTitle';
import { ItemCardTop } from './ItemCardTop';

const ItemCardBody = (props: ItemCardBodyProps) => {
  const { tile, eyebrow, status, title, tags, details, actions, href, navigate, onOpen, selected, level = 3 } = props;
  const heading = (
    <>
      <ItemCardTop eyebrow={eyebrow} status={status} />
      <ItemCardTitle title={title} href={href} navigate={navigate} onOpen={onOpen} selected={selected} level={level} />
    </>
  );
  return (
    <Box className="item-card__body">
      {tile ? <ItemCardHead tile={tile}>{heading}</ItemCardHead> : heading}
      <ItemCardFoot tags={tags} details={details} actions={actions} />
    </Box>
  );
};

export { ItemCardBody };
