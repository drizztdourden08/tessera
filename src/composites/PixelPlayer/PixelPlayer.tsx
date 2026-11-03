/* @layer renderer-components @kind component */
import { useCallback, useMemo, useState } from 'react';
import { Box } from '../../primitives/Box';
import { initialSpeed } from './behavior/initial-speed';
import { playbackRange } from './behavior/playback-range';
import { runKeyAction } from './behavior/run-key-action';
import { useFramePlayer } from './behavior/useFramePlayer';
import { useTagChoice } from './behavior/useTagChoice';
import { PixelPlayerBar } from './sub-components/PixelPlayerBar';
import { PixelPlayerStage } from './sub-components/PixelPlayerStage';
import { DEFAULT_LOOP, DEFAULT_SPEEDS } from './PixelPlayer.constants';
import type { PixelPlayerCell, PixelPlayerProps, PixelPlayerTag, PlayerKeyAction } from './PixelPlayer.type';
import './PixelPlayer.css';

const NO_TAGS: readonly PixelPlayerTag[] = [];

const NO_CELLS: readonly PixelPlayerCell[] = [];

const PixelPlayer = (props: PixelPlayerProps) => {
  const {
    frames, label, mode = 'large', zoom = 'fit', backdrop = 'checker', loop = DEFAULT_LOOP, speeds = DEFAULT_SPEEDS, tags = NO_TAGS,
    tagId, onTagChange, cells = NO_CELLS, onCellHover, controls = true, autoPlay = false, placeholder, className,
  } = props;
  const [tagValue, chooseTag] = useTagChoice({ tagId, onTagChange });
  const tag = tags.find((candidate) => candidate.id === tagValue);
  const range = useMemo(() => playbackRange(frames.length, tag?.from, tag?.to), [frames.length, tag?.from, tag?.to]);
  const steady = useMemo(() => ({ direction: loop.direction, repeat: loop.repeat }), [loop.direction, loop.repeat]);
  const [speed, setSpeed] = useState(() => initialSpeed(speeds));
  const player = useFramePlayer({ frames, range, loop: steady, speed, autoPlay });
  const animated = frames.length > 1;
  const onKeyAction = useCallback((action: PlayerKeyAction) => runKeyAction(player, action), [player]);
  const classes = ['pixel-player', `pixel-player--${mode}`, className].filter(Boolean).join(' ');

  return (
    <Box className={classes}>
      <PixelPlayerStage
        frames={frames}
        image={frames[player.index]?.image ?? null}
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
