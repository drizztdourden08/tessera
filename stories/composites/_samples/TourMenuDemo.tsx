/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { GuidedTour, useGuidedTour } from '../../../src/composites';
import type { TourStep } from '../../../src/composites';
import { Box, Button, Card, Text } from '../../../src/primitives';
import type { TourSampleProps } from './TourDemo.type';

const PAGES = ['Home', 'Library', 'Settings', 'Help'] as const;

const TourMenuDemo = (props: TourSampleProps) => {
  const menu = useRef<HTMLElement>(null);
  const entry = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const [page, setPage] = useState<string>('Home');
  const steps = useMemo<TourStep[]>(() => [
    {
      id: 'menu',
      target: menu,
      placement: 'right-start',
      advance: 'click',
      clickTarget: entry,
      title: 'The menu',
      body: 'Every place in the app is one entry away. The whole menu is lit, but only Settings goes on.',
      hint: 'Click Settings to go on.',
      onEnter: () => setPage('Home'),
    },
    { id: 'page', target: panel, title: 'Settings', body: 'The entry opened its page.', mascot: 'happy', onEnter: () => setPage('Settings') },
  ], []);
  const tour = useGuidedTour({ steps });

  return (
    <Box className="tour-mini tour-mini--menu">
      <Box ref={menu} as="nav" className="tour-mini__menu" aria-label="Menu">
        {PAGES.map((name) => (
          <Button
            key={name}
            ref={name === 'Settings' ? entry : undefined}
            variant={name === page ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setPage(name)}
          >
            {name}
          </Button>
        ))}
      </Box>
      <Box className="tour-mini__page">
        <Box className="tour-mini__bar">
          <Text variant="title">{page}</Text>
          <Button variant="secondary" size="sm" onClick={() => tour.start()}>Start tour</Button>
        </Box>
        <Box ref={panel}>
          <Card title={page}>
            <Text>{page === 'Settings' ? 'Sound, keys and the theme live here.' : 'Pick an entry in the menu.'}</Text>
          </Card>
        </Box>
      </Box>
      <GuidedTour tour={tour} mascot={props.mascot} />
    </Box>
  );
};

export { TourMenuDemo };
