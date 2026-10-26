/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { RefObject } from 'react';
import type { MascotStageHandle } from '../../../brand/MascotStage/MascotStage.type';
import { MASCOT_ID } from '../GuidedTour.constants';
import type { MascotPresenting } from './tour-internal.type';
import { walkSpeed } from './walk-speed';

const useMascotPresenter = (stageRef: RefObject<MascotStageHandle | null>, presenting: MascotPresenting): void => {
  const { brand, spot, clip, walk } = presenting;
  const x = spot?.x ?? null;
  const face = spot?.face ?? 'right';

  useEffect(() => {
    const actor = stageRef.current?.actor(MASCOT_ID);
    if (!actor || x === null) return undefined;
    let live = true;
    void actor.moveTo(x, { speed: walkSpeed(actor.state().x, x), clip: walk }).then((result) => {
      if (live && result === 'done') void actor.play(clip, { face });
    });
    return () => { live = false; };
  }, [stageRef, brand, x, face, clip, walk]);
};

export { useMascotPresenter };
