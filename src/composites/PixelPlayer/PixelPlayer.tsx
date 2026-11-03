/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { usePixelPlayback } from './behavior/usePixelPlayback';
import { PixelPlayerBar } from './sub-components/PixelPlayerBar';
import { PixelPlayerStage } from './sub-components/PixelPlayerStage';
import { NO_CELLS } from './PixelPlayer.constants';
import type { PixelPlayerProps } from './PixelPlayer.type';
import './PixelPlayer.css';

const PixelPlayer = (props: PixelPlayerProps) => {
  const { frames, label, mode = 'large', zoom = 'fit', backdrop = 'checker', cells = NO_CELLS, onCellHover, controls = true, placeholder, className } = props;
  const playback = usePixelPlayback(props);
  const { player, range, speeds, speed, setSpeed, tags, tagValue, chooseTag, onKeyAction, image, animated } = playback;
  const classes = ['pixel-player', `pixel-player--${mode}`, className].filter(Boolean).join(' ');

  return (
    <Box className={classes}>
      <PixelPlayerStage
        frames={frames}
        image={image}
        label={label}
        zoom={zoom}
        backdrop={backdrop}
        showZoom={mode === 'large'}
        cells={cells}
        onCellHover={onCellHover}
        onKeyAction={onKeyAction}
        placeholder={placeholder}
      />
      {controls && mode === 'large' && animated ? (
        <PixelPlayerBar player={player} range={range} speeds={speeds} speed={speed} onSpeed={setSpeed} tags={tags} tagValue={tagValue} onTag={chooseTag} />
      ) : null}
    </Box>
  );
};

export { PixelPlayer };
