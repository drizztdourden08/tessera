/* @layer renderer-components @kind component */
import '../../theme/focus-ring.css';
import { Box } from '../../primitives/Box';
import { Span } from '../../primitives/text-elements';
import { mediaAspect } from './behavior/media-aspect';
import { TileCornerSlots } from './sub-components/TileCornerSlots';
import { MEDIA_ASPECT_PROPERTY } from './Tile.constants';
import type { CSSProperties } from 'react';
import type { TileProps } from './Tile.type';
import './Tile.css';

const Tile = (props: TileProps) => {
  const { media, mediaAspect: aspect, name, corners, selected = false, focused = false, className, role, style, ...rest } = props;
  const classes = ['tile', 'focus-ring-inset', className].filter(Boolean).join(' ');
  const ratio = mediaAspect(aspect);
  const placed = ratio === undefined ? style : ({ ...style, [MEDIA_ASPECT_PROPERTY]: ratio } as CSSProperties);

  return (
    <Box
      {...rest}
      style={placed}
      role={role}
      aria-selected={role === undefined ? undefined : selected}
      className={classes}
      data-selected={selected || undefined}
      data-focused={focused || undefined}
    >
      <Box className="tile__media">
        {media}
        {corners !== undefined && <TileCornerSlots corners={corners} />}
      </Box>
      {name !== undefined && (
        <Span className="tile__name" title={typeof name === 'string' ? name : undefined}>{name}</Span>
      )}
    </Box>
  );
};

export { Tile };
