/* @layer renderer-components @kind hook */
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from '../../../primitives/dom/useReducedMotion';
import { createStageEngine } from './stage-engine';
import type { StageEngine } from './stage-engine.type';
import { useEngineClock } from './useEngineClock';
import type { EngineOptions } from './useStageEngine.type';

const useStageEngine = (stageRef: RefObject<HTMLElement | null>, options: EngineOptions): StageEngine => {
  const { cast, height, playing, speed, motion, onEvent } = options;
  const [engine] = useState(createStageEngine);
  const system = useReducedMotion(stageRef);
  const reduced = motion === 'system' ? system : motion === 'reduced';
  useMemo(() => engine.sync(cast), [engine, cast]);
  useEffect(() => {
    engine.listener.current = onEvent;
  }, [engine, onEvent]);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    engine.setElement(stage);
    engine.resize(stage.getBoundingClientRect().width, height);
    const observer = new ResizeObserver(([entry]) => engine.resize(entry?.contentRect.width ?? 0, height));
    observer.observe(stage);
    return () => observer.disconnect();
  }, [engine, stageRef, height]);
  useEngineClock(engine, { playing, speed, reduced });
  return engine;
};

export { useStageEngine };
