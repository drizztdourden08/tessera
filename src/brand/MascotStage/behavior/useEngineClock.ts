/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { StageEngine } from './stage-engine.type';
import type { EngineClockOptions } from './useEngineClock.type';

const useEngineClock = (engine: StageEngine, options: EngineClockOptions): void => {
  const { playing, speed, reduced } = options;
  useEffect(() => engine.setPlaying(playing), [engine, playing]);
  useEffect(() => engine.setSpeed(speed), [engine, speed]);
  useEffect(() => engine.setReduced(reduced), [engine, reduced]);
  useEffect(() => {
    engine.start();
    return () => engine.stop();
  }, [engine]);
};

export { useEngineClock };
