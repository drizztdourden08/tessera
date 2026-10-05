/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { MascotStageHandle } from '../../MascotStage/MascotStage.type';
import { SOLO_ACTOR } from '../AnimatedMascot.constants';
import type { MascotActorOptions } from './useMascotActor.type';

const useMascotState = (stage: MascotStageHandle, options: MascotActorOptions): void => {
  const { brand, animation, rest, face, loop, onFinish } = options;
  const finish = useRef(onFinish);
  const placed = useRef<string | null>(null);
  useEffect(() => {
    finish.current = onFinish;
  }, [onFinish]);
  useEffect(() => {
    const actor = stage.actor(SOLO_ACTOR);
    if (!actor) return;
    const first = placed.current !== brand;
    placed.current = brand;
    const how = { ...(loop === undefined ? {} : { loop }), ...(first ? { blend: 0 } : {}) };
    void actor.play(animation ?? rest, how).then((result) => {
      if (result === 'done') finish.current?.();
    });
  }, [stage, brand, animation, rest, loop]);
  useEffect(() => {
    if (face) stage.actor(SOLO_ACTOR)?.turn(face);
  }, [stage, brand, face]);
};

export { useMascotState };
