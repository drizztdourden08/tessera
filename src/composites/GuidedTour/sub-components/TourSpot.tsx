/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Portal } from '../../../primitives/Portal';
import { useFoundTargets } from '../behavior/useFoundTargets';
import { useSeekTarget } from '../behavior/useSeekTarget';
import { useSpotlight } from '../behavior/useSpotlight';
import { useTopLayer } from '../behavior/useTopLayer';
import { TourSpotlight } from './TourSpotlight';
import type { TourSpotProps } from './TourSpot.type';
import './TourSpot.css';

const TourSpot = (props: TourSpotProps) => {
  const { target, keep, className } = props;
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const found = useSeekTarget(root, target);
  const spot = useSpotlight(root, found, useFoundTargets(root, keep, found));
  useTopLayer(root);

  return (
    <Portal layer="modal">
      <Box ref={setRoot} popover="manual" className={['tour-layer tour-spot', className].filter(Boolean).join(' ')} data-lit={found ? 'true' : undefined} aria-hidden>
        <TourSpotlight spot={spot} />
      </Box>
    </Portal>
  );
};

export { TourSpot };
