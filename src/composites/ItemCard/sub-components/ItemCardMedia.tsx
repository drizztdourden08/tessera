/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { ItemCardMediaProps } from '../ItemCard.type';

const ItemCardMedia = (props: ItemCardMediaProps) => {
  const { media, label, tone = 'primary', height = 'band', tiled } = props;
  if (!media) return null;
  return (
    <Box
      className="item-card__media"
      data-tone={tone}
      data-size={tiled ? 'sm' : undefined}
      data-height={height === 'band' || tiled ? undefined : height}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {media}
    </Box>
  );
};

export { ItemCardMedia };
