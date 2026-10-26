/* @layer stories @kind component */
import { useMemo } from 'react';
import { BrandMark } from '../../../src/brand';
import { GuidedTour, useGuidedTour } from '../../../src/composites';
import type { TourStep } from '../../../src/composites';
import { Box, Button, Card, Text } from '../../../src/primitives';
import type { TourSampleProps } from './TourDemo.type';

const TourIntroDemo = (props: TourSampleProps) => {
  const steps = useMemo<TourStep[]>(() => [
    {
      id: 'welcome',
      intro: true,
      art: <BrandMark app="archipelia" size="xl" />,
      title: 'Welcome to Archipelia',
      body: 'A short walk through your first island. It takes a minute, and you can leave at any time with Escape.',
      mascot: 'wave',
    },
    { id: 'map', target: { tour: 'intro-map' }, title: 'The map', body: 'Every island you visit is pinned here.', mascot: 'point' },
  ], []);
  const tour = useGuidedTour({ steps });

  return (
    <Box className="tour-mini">
      <Box className="tour-mini__bar">
        <Text variant="title">Archipelia</Text>
        <Button variant="secondary" size="sm" onClick={() => tour.start()}>Start tour</Button>
      </Box>
      <Box data-tour="intro-map">
        <Card title="Islands">
          <Text>Three islands are charted.</Text>
        </Card>
      </Box>
      <GuidedTour tour={tour} mascot={props.mascot} />
    </Box>
  );
};

export { TourIntroDemo };
