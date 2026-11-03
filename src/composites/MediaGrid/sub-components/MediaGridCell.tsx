/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Image } from '../../../primitives/Image';
import { Pressable } from '../../../primitives/Pressable';
import { Tag } from '../../../primitives/Tag';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { MEDIA_GRID_RATIO } from '../MediaGrid.constants';
import type { MediaGridCellProps } from '../MediaGrid.type';

const MediaGridCell = ({ item, index, onOpen }: MediaGridCellProps) => {
  const { mediaGrid } = useTesseraStrings();
  const { src, caption, source } = item;
  return (
    <Box role="listitem" className="media-grid__cell">
      <Pressable className="media-grid__thumb" aria-label={mediaGrid.open(caption)} onClick={() => onOpen(index)}>
        <Image src={src} alt="" loading="lazy" aspectRatio={MEDIA_GRID_RATIO} />
      </Pressable>
      <Text variant="caption" tone="muted" className="media-grid__caption">{caption}</Text>
      {source !== undefined && <Tag>{source}</Tag>}
    </Box>
  );
};

export { MediaGridCell };
