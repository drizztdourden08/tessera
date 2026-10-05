/* @layer renderer-components @kind hook */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useReducedMotion } from '../../../primitives/dom/useReducedMotion';
import { reducedNow } from '../../MascotStage/behavior/reduced-now';
import { createStageEngine } from '../../MascotStage/behavior/stage-engine';
import { SOLO_ACTOR } from '../AnimatedMascot.constants';
import type { MascotActorOptions } from './useMascotActor.type';
import { useMascotState } from './useMascotState';

const useMascotActor = (ref: RefObject<SVGSVGElement | null>, options: MascotActorOptions): void => {
  const { brand, animation, face, playing = true, speed = 1, scene } = options;
  const [engine] = useState(createStageEngine);
  const reduced = useReducedMotion(ref);
  const start = useRef({ animation, face });
  useMemo(() => engine.sync([{ id: SOLO_ACTOR, brand, clip: start.current.animation, face: start.current.face }]), [engine, brand]);
  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg || !scene) return undefined;
    return engine.attach(SOLO_ACTOR, undefined, svg, reducedNow(svg));
  }, [engine, ref, scene]);
  useEffect(() => {
    engine.start();
    return () => engine.stop();
  }, [engine]);
  useEffect(() => engine.setPlaying(playing), [engine, playing]);
  useEffect(() => engine.setSpeed(speed), [engine, speed]);
  useEffect(() => engine.setReduced(reduced), [engine, reduced]);
  useMascotState(engine.handle, options);
};

export { useMascotActor };
