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
  const set = (keys: readonly string[], value: boolean) => setHidden((now) => new Set(value ? [...now, ...keys] : [...now].filter((key) => !keys.includes(key))));
  const sweep = useToggleSweep({
    order: ordered ? ids : undefined,
    onEnd: (keys, value) => {
      set(keys, value);
      setLast(`One change: ${keys.length} ${keys.length === 1 ? 'layer' : 'layers'} ${value ? 'hidden' : 'shown'}`);
    },
  });
  const shown = (id: string) => (sweep.touched.includes(id) ? sweep.value === true : hidden.has(id));
  return (
    <Box className="story-column toggle-sweep-story">
      {ids.map((id) => (
        <Box key={id} className="toggle-sweep-story__row" {...sweep.bind(id, hidden.has(id))}>
          <Toggle label={id} checked={shown(id)} onChange={(value) => set([id], value)} />
        </Box>
      ))}
      <Text className="story-label">{sweep.sweeping ? 'Sweeping' : last}</Text>
    </Box>
  );
};

export { ToggleSweepDemo };
