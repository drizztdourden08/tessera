/* @layer stories @kind component */
import { useState } from 'react';
import { useToggleSweep } from '../../../src/composites';
import { Box, Text, Toggle } from '../../../src/primitives';

interface ToggleSweepDemoProps {
  count: number;
  ordered: boolean;
}

const ToggleSweepDemo = ({ count, ordered }: ToggleSweepDemoProps) => {
  const ids = Array.from({ length: count }, (_, at) => `Layer ${at + 1}`);
  const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
  const [last, setLast] = useState('Press a toggle and drag down the column');
  const set = (id: string, value: boolean) => setHidden((now) => new Set(value ? [...now, id] : [...now].filter((key) => key !== id)));
  const sweep = useToggleSweep({
    order: ordered ? ids : undefined,
    onSet: set,
    onEnd: (keys, value) => setLast(`${keys.length} ${keys.length === 1 ? 'layer' : 'layers'} ${value ? 'hidden' : 'shown'}`),
  });
  return (
    <Box className="story-column toggle-sweep-story">
      {ids.map((id) => (
        <Box key={id} className="toggle-sweep-story__row" {...sweep.bind(id, hidden.has(id))}>
          <Toggle label={id} checked={hidden.has(id)} onChange={(value) => set(id, value)} />
        </Box>
      ))}
      <Text className="story-label">{sweep.sweeping ? 'Sweeping' : last}</Text>
    </Box>
  );
};

export { ToggleSweepDemo };
