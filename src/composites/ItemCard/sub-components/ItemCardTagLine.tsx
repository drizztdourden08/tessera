/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Tag } from '../../../primitives/Tag';
import { useTagLineFit } from '../behavior/useTagLineFit';
import type { ItemCardTagLineProps } from '../ItemCard.type';
import './ItemCardTagLine.css';

const ItemCardTagLine = (props: ItemCardTagLineProps) => {
  const { tags } = props;
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const fit = useTagLineFit({ rowRef, measureRef, count: tags.length });
  const hidden = tags.length - fit;
  return (
    <Box ref={rowRef} className="item-card__tag-line">
      {tags.slice(0, fit)}
      {hidden > 0 && <Tag>{`+${hidden}`}</Tag>}
      <Box className="item-card__tag-measure" aria-hidden inert>
        <Box ref={measureRef} className="item-card__tag-measure-row">
          {tags}
          <Tag>{`+${tags.length}`}</Tag>
        </Box>
      </Box>
    </Box>
  );
};

export { ItemCardTagLine };
