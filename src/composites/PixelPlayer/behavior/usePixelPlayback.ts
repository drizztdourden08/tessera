/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_LOOP, DEFAULT_SPEEDS, NO_TAGS } from '../PixelPlayer.constants';
import type { PixelPlayback, PixelPlaybackParams, PlayerKeyAction } from '../PixelPlayer.type';
import { initialSpeed } from './initial-speed';
import { playbackRange } from './playback-range';
import { runKeyAction } from './run-key-action';
import { useFramePlayer } from './useFramePlayer';
import { useTagChoice } from './useTagChoice';

const usePixelPlayback = (params: PixelPlaybackParams): PixelPlayback => {
  const { frames, loop = DEFAULT_LOOP, speeds = DEFAULT_SPEEDS, tags = NO_TAGS, tagId, onTagChange, autoPlay = false } = params;
  const [tagValue, chooseTag] = useTagChoice({ tagId, onTagChange });
  const tag = tags.find((candidate) => candidate.id === tagValue);
  const range = useMemo(() => playbackRange(frames.length, tag?.from, tag?.to), [frames.length, tag?.from, tag?.to]);
  const steady = useMemo(() => ({ direction: loop.direction, repeat: loop.repeat }), [loop.direction, loop.repeat]);
  const [speed, setSpeed] = useState(() => initialSpeed(speeds));
  const player = useFramePlayer({ frames, range, loop: steady, speed, autoPlay });
  const onKeyAction = useCallback((action: PlayerKeyAction) => runKeyAction(player, action), [player]);

  return {
    player, range, speeds, speed, setSpeed, tags, tagValue, chooseTag, onKeyAction,
    image: frames[player.index]?.image ?? null,
    animated: frames.length > 1,
  };
};

export { usePixelPlayback };
