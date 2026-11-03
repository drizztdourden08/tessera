/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { usePageVisible } from '../../../primitives/dom/usePageVisible';
import { MIN_FRAME_MS } from '../PixelPlayer.constants';
import type { FramePlayer, FramePlayerParams } from '../PixelPlayer.type';
import { freshState } from './fresh-state';
import { initialPlaying } from './initial-playing';
import { playerReducer } from './player-reducer';

const useFramePlayer = (params: FramePlayerParams): FramePlayer => {
  const { frames, range, loop, speed, autoPlay } = params;
  const [state, dispatch] = useReducer(playerReducer, undefined, () => freshState(range, loop.direction, initialPlaying(autoPlay)));
  const pageRef = useRef<Element | null>(null);
  const visible = usePageVisible(pageRef);
  const shape = `${range.from}:${range.to}:${loop.direction}:${loop.repeat}`;
  const [seenShape, setSeenShape] = useState(shape);
  if (seenShape !== shape) {
    setSeenShape(shape);
    dispatch({ type: 'restart', range, loop });
  }
  const index = Math.min(Math.max(state.index, range.from), range.to);
  const running = state.playing && visible && range.to > range.from;
  useEffect(() => {
    if (!running) return undefined;
    const wait = Math.max(MIN_FRAME_MS, (frames[index]?.durationMs ?? MIN_FRAME_MS) / speed);
    const timer = setTimeout(() => dispatch({ type: 'advance', range, loop }), wait);
    return () => clearTimeout(timer);
  }, [running, state, index, frames, speed, range, loop]);
  const toggle = useCallback(() => dispatch(state.playing && !state.finished ? { type: 'pause' } : { type: 'play', range, loop }), [state.playing, state.finished, range, loop]);
  const step = useCallback((delta: number) => dispatch({ type: 'step', delta, range }), [range]);
  const jump = useCallback((to: 'first' | 'last') => dispatch({ type: 'jump', to, range }), [range]);
  return { index, playing: state.playing, finished: state.finished, toggle, step, jump };
};

export { useFramePlayer };
