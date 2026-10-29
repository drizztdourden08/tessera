/* @layer stories @kind component */
import { useState } from 'react';
import { Tile } from '../../../src/composites';
import type { TileProps } from '../../../src/composites';
import '../Tile.stories.css';
import { Badge, Box, Icon, Image } from '../../../src/primitives';
import { SPRITE_URI } from '../../primitives/_samples/image-scenes.constants';

type TileDemoProps = Partial<Pick<TileProps, 'name' | 'selected' | 'focused' | 'onClick' | 'mediaAspect'>> & {
  corners?: boolean;
  width?: 'md' | 'lg';
};

const TileDemo = (props: TileDemoProps) => {
  const { name = 'hero-idle.png', corners = true, selected, focused, width = 'md', mediaAspect, onClick } = props;
  return (
    <Tile
      name={name}
      className={`tile-story__${width}`}
      selected={selected}
      focused={focused}
      mediaAspect={mediaAspect}
      onClick={onClick}
      media={<Image src={SPRITE_URI} alt="" fit="integer" backdrop="checker" pixelated />}
      corners={corners ? {
        topStart: <Badge variant="inline" value="PNG" color="info" />,
        topEnd: <Icon name="lock" size={14} aria-label="Locked" />,
        bottomStart: <Badge variant="dot" color="success" label="Saved" />,
        bottomEnd: <Badge variant="inline" value={4} label="Frame count" />,
      } : undefined}
    />
  );
};

const NAMES = ['hero-idle.png', 'hero-walk.png', 'tree.png', 'chest.png', 'slime-a-very-long-name-that-is-cut.png', 'door.png'];

const TileRow = () => {
  const [picked, setPicked] = useState(1);
  return (
    <Box className="story-row">
      {NAMES.map((name, at) => (
        <TileDemo key={name} name={name} selected={picked === at} focused={at === 2} corners={at % 2 === 0} onClick={() => setPicked(at)} />
      ))}
    </Box>
  );
};

const RATIOS = ['1', '4/3', '16/9', '3/4'] as const;

const TileRatios = () => (
  <Box className="story-row">
    {RATIOS.map((ratio) => (
      <TileDemo key={ratio} name={`ratio ${ratio}`} mediaAspect={ratio} corners={false} />
    ))}
  </Box>
);

export { TileDemo, TileRatios, TileRow };
