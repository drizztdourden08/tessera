/* @layer stories @kind component */
import { Emphasis } from '../../../src/composites';
import type { EmphasisAnchor, EmphasisOrder } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import '../../typography/variable-type.css';

const ANCHORS: readonly EmphasisAnchor[] = ['left', 'center', 'right'];

const ORDERS: readonly { label: string; anchor: EmphasisAnchor; order: EmphasisOrder }[] = [
  { label: 'From the left', anchor: 'left', order: 'anchor' },
  { label: 'From the center', anchor: 'center', order: 'anchor' },
  { label: 'From the right', anchor: 'right', order: 'anchor' },
  { label: 'Random', anchor: 'center', order: 'random' },
  { label: 'Custom: edges in', anchor: 'center', order: [0, 9, 1, 8, 2, 7, 3, 6, 4, 5] },
];

const AnchorDemo = () => (
  <Box className="story-list">
    {ANCHORS.map((anchor) => (
      <Box key={anchor} className="story-list__item">
        <Text className="variable-type__label">{anchor}</Text>
        <Text className="variable-type__size-20">
          Aria found the <Emphasis trigger="loop" anchor={anchor} from={300} to={900} duration={1600}>Hookshot</Emphasis> in the Swamp Palace.
        </Text>
      </Box>
    ))}
  </Box>
);

const WaveOrderDemo = () => (
  <Box className="story-list">
    {ORDERS.map((row) => (
      <Box key={row.label} className="story-list__item">
        <Text className="variable-type__label">{row.label}</Text>
        <Text className="variable-type__size-32">
          <Emphasis trigger="loop" anchor={row.anchor} order={row.order} from={200} to={900} duration={1400} stagger={90}>Multiworld</Emphasis>
        </Text>
      </Box>
    ))}
  </Box>
);

export { AnchorDemo, WaveOrderDemo };
