/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { Box, Button, Image } from '../../../src/primitives';
import { VALLEY_URI } from './image-scenes.constants';

const ARRIVAL_MS = 2500;

const Arrival = () => {
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setArrived(true), ARRIVAL_MS);
    return () => clearTimeout(timer);
  }, []);
  return <Image className="image-demo" src={arrived ? VALLEY_URI : undefined} pending alt="Screenshot of the valley at midday" />;
};

const ImageSlowArrival = () => {
  const [round, setRound] = useState(0);
  return (
    <Box className="story-column">
      <Arrival key={round} />
      <Box>
        <Button size="sm" variant="secondary" onClick={() => setRound((value) => value + 1)}>Load again</Button>
      </Box>
    </Box>
  );
};

export { ImageSlowArrival };
