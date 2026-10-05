/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { TourSpot } from '../../../src/composites';
import { Box, Button, Card, StatRow } from '../../../src/primitives';

const TourSpotDemo = () => {
  const bar = useRef<HTMLElement>(null);
  const time = useRef<HTMLElement>(null);
  const seeds = useRef<HTMLElement>(null);
  const friends = useRef<HTMLElement>(null);
  const cards = useMemo(() => [time, seeds, friends], []);
  const keep = useMemo(() => [bar], []);
  const [lit, setLit] = useState<number | null>(null);

  return (
    <Box className="tour-mini">
      <Box ref={bar} className="tour-mini__bar">
        <Button variant="secondary" size="sm" onClick={() => setLit(((lit ?? -1) + 1) % cards.length)}>
          {lit === null ? 'Show the spot' : 'Light the next card'}
        </Button>
        {lit !== null && <Button variant="ghost" size="sm" onClick={() => setLit(null)}>Hide the spot</Button>}
      </Box>
      <Box className="tour-mini__cards">
        <Box ref={time}><Card title="Time played"><StatRow label="This week" value="12 h 40 min" /></Card></Box>
        <Box ref={seeds}><Card title="Seeds"><StatRow label="Finished" value="3 of 5" /></Card></Box>
        <Box ref={friends}><Card title="Friends"><StatRow label="Online" value="4" /></Card></Box>
      </Box>
      {lit !== null && <TourSpot target={cards[lit] ?? null} keep={keep} />}
    </Box>
  );
};

export { TourSpotDemo };
