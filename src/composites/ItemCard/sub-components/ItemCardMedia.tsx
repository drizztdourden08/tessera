/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { ItemCardMediaProps } from '../ItemCard.type';

const ItemCardMedia = (props: ItemCardMediaProps) => {
  const { media, tone = 'primary', height = 'band', tiled } = props;
  if (!media) return null;
  return (
    <Box className="item-card__media" data-tone={tone} data-size={tiled ? 'sm' : undefined} data-height={height === 'band' || tiled ? undefined : height} aria-hidden>{media}</Box>
  );
};

export { ItemCardMedia };
