/* @layer renderer-components @kind hook */
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from '../../../primitives/dom/useReducedMotion';
import type { MascotStageProps } from '../MascotStage.type';
import { createStageEngine } from './stage-engine';
import type { StageEngine } from './stage-engine.type';

type EngineOptions = Required<Pick<MascotStageProps, 'cast' | 'height' | 'playing' | 'speed' | 'motion'>> & Pick<MascotStageProps, 'onEvent'>;

/** Creates the stage engine, keeps it in step with the props and the stage size, and runs its frame loop. */
const useStageEngine = (stageRef: RefObject<HTMLDivElement | null>, options: EngineOptions): StageEngine => {
  const { cast, height, playing, speed, motion, onEvent } = options;
  const [engine] = useState(createStageEngine);
  const system = useReducedMotion(stageRef);
  const reduced = motion === 'system' ? system : motion === 'reduced';
  useMemo(() => engine.sync(cast), [engine, cast]);
  useEffect(() => {
    engine.listener.current = onEvent;
  }, [engine, onEvent]);
  useEffect(() => engine.setPlaying(playing), [engine, playing]);
  useEffect(() => engine.setSpeed(speed), [engine, speed]);
  useEffect(() => engine.setReduced(reduced), [engine, reduced]);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    engine.setElement(stage);
    engine.resize(stage.getBoundingClientRect().width, height);
    const observer = new ResizeObserver(([entry]) => engine.resize(entry?.contentRect.width ?? 0, height));
    observer.observe(stage);
    return () => observer.disconnect();
  }, [engine, stageRef, height]);
  useEffect(() => {
    engine.start();
    return () => engine.stop();
  }, [engine]);
  return engine;
};

export { useStageEngine };
