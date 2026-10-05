/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import { mascotBrandOf } from '../../../brand/AnimatedMascot/behavior/mascot-brand-of';
import { usePaletteName } from '../../../brand/AnimatedMascot/behavior/usePaletteName';
import { MascotStage } from '../../../brand/MascotStage';
import type { MascotStageCast, MascotStageHandle } from '../../../brand/MascotStage/MascotStage.type';
import { Box } from '../../../primitives/Box';
import { mascotSpot } from '../behavior/mascot-spot';
import { useMascotPresenter } from '../behavior/useMascotPresenter';
import { MASCOT_BOX, MASCOT_GAP, MASCOT_HEIGHT, MASCOT_ID } from '../GuidedTour.constants';
import type { TourMascotProps } from './TourMascot.type';

const TourMascot = (props: TourMascotProps) => {
  const { choice, area, view, clip } = props;
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<MascotStageHandle>(null);
  const palette = usePaletteName(ref, choice === 'auto');
  const brand = choice === 'auto' ? mascotBrandOf(palette) : choice;
  const spot = area && view.width > 0 ? mascotSpot(area, view, MASCOT_BOX, MASCOT_GAP) : null;
  const cast = useMemo<MascotStageCast[]>(() => (brand ? [{ id: MASCOT_ID, brand, clip: 'idle' }] : []), [brand]);
  useMascotPresenter(stageRef, { brand, spot, clip });

  return (
    <Box
      ref={ref}
      className={spot && brand ? 'guided-tour__mascot guided-tour__mascot--shown' : 'guided-tour__mascot'}
      style={spot ? { transform: `translateY(${spot.y}px)` } : undefined}
      aria-hidden
    >
      {brand && <MascotStage ref={stageRef} cast={cast} height={MASCOT_HEIGHT} className="guided-tour__stage" />}
    </Box>
  );
};

export { TourMascot };
