/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { GuidedTour, useGuidedTour } from '../../../src/composites';
import type { TourStep } from '../../../src/composites';
import { Box, Button, Card, Text, TextInput } from '../../../src/primitives';
import type { TourSampleProps } from './TourDemo.type';

const TourWaitDemo = (props: TourSampleProps) => {
  const form = useRef<HTMLElement>(null);
  const list = useRef<HTMLElement>(null);
  const [name, setName] = useState('');
  const [seeds, setSeeds] = useState<readonly string[]>(['Morning run']);
  const steps = useMemo<TourStep[]>(() => [
    {
      id: 'name',
      target: form,
      advance: 'wait',
      title: 'Add a seed',
      body: 'A seed is a saved run. Give this one a name and save it.',
      hint: 'Type a name, then press Save.',
      mascot: 'curious',
    },
    { id: 'saved', target: list, title: 'Saved', body: 'The new seed sits at the top of the list.', mascot: 'success' },
  ], []);
  const tour = useGuidedTour({ steps });
  const save = (): void => {
    const named = name.trim();
    if (!named) return;
    setSeeds([named, ...seeds]);
    setName('');
    if (tour.current?.id === 'name') tour.next();
  };

  return (
    <Box className="tour-mini">
      <Box className="tour-mini__bar">
        <Text variant="title">Seeds</Text>
        <Button variant="secondary" size="sm" onClick={() => tour.start()}>Start tour</Button>
      </Box>
      <Box ref={form} className="tour-mini__form">
        <TextInput aria-label="Seed name" placeholder="Seed name" value={name} onChange={(event) => setName(event.target.value)} onEnter={save} />
        <Button variant="primary" size="sm" onClick={save}>Save</Button>
      </Box>
      <Box ref={list}>
        <Card title="Saved seeds">
          {seeds.map((seed) => <Text key={seed}>{seed}</Text>)}
        </Card>
      </Box>
      <GuidedTour tour={tour} mascot={props.mascot} />
    </Box>
  );
};

export { TourWaitDemo };
