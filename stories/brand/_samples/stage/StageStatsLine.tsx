/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { MascotStageHandle } from '../../../../src/brand';
import { Text } from '../../../../src/primitives';

const EVERY_MS = 1000;

const StageStatsLine = (props: { stage: RefObject<MascotStageHandle | null> }) => {
  const { stage } = props;
  const [line, setLine] = useState('Measuring the frame cost');
  useEffect(() => {
    let before = stage.current?.stats();
    const timer = window.setInterval(() => {
      const now = stage.current?.stats();
      if (now && before && now.frames > before.frames) {
        const frames = now.frames - before.frames;
        const average = (now.busyMs - before.busyMs) / frames;
        setLine(`${frames} frames a second · engine ${average.toFixed(3)} ms a frame on average · worst so far ${now.worstMs.toFixed(2)} ms`);
      }
      before = now;
    }, EVERY_MS);
    return () => window.clearInterval(timer);
  }, [stage]);
  return <Text variant="caption" data-testid="stage-stats">{line}</Text>;
};

export { StageStatsLine };
