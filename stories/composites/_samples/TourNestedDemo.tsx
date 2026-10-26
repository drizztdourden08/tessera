/* @layer stories @kind component */
import { useMemo, useRef } from 'react';
import { GuidedTour, useGuidedTour } from '../../../src/composites';
import type { TourStep } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import type { TourSampleProps } from './TourDemo.type';

const ROWS = Array.from({ length: 40 }, (_, index) => `Row ${index + 1}`);

const TourNestedDemo = (props: TourSampleProps) => {
  const deep = useRef<HTMLElement>(null);
  const steps = useMemo<TourStep[]>(() => [
    {
      id: 'deep',
      target: deep,
      title: 'Found it',
      body: 'The row sat at the bottom of a list inside a panel inside a page. The tour scrolled each of them before it lit the row.',
      mascot: 'point',
    },
  ], []);
  const tour = useGuidedTour({ steps });

  return (
    <Box className="tour-mini tour-nested">
      <Box className="tour-mini__bar">
        <Text variant="title">Nested scrollers</Text>
        <Button variant="secondary" size="sm" onClick={() => tour.start()}>Start tour</Button>
      </Box>
      <Box className="tour-nested__page">
        <Text>Scroll the page, then the list in it.</Text>
        <Box className="tour-nested__spacer" />
        <Box className="tour-nested__list">
          {ROWS.map((row, index) => (
            <Box key={row} ref={index === ROWS.length - 1 ? deep : undefined} className="tour-nested__row">
              <Text>{row}</Text>
            </Box>
          ))}
        </Box>
      </Box>
      <GuidedTour tour={tour} mascot={props.mascot} />
    </Box>
  );
};

export { TourNestedDemo };
