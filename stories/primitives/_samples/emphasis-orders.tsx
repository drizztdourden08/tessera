/* @layer stories @kind component */
import type { EmphasisAnchor, EmphasisOrder } from '../../../src/primitives';
import { Emphasis, Text } from '../../../src/primitives';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import '../../typography/variable-type.css';

const ANCHORS: readonly EmphasisAnchor[] = ['left', 'center', 'right'];

const ORDERS: readonly { label: string; anchor: EmphasisAnchor; order: EmphasisOrder }[] = [
  { label: 'From the left', anchor: 'left', order: 'anchor' },
  { label: 'From the center', anchor: 'center', order: 'anchor' },
  { label: 'From the right', anchor: 'right', order: 'anchor' },
  { label: 'Random', anchor: 'center', order: 'random' },
  { label: 'Custom: edges in', anchor: 'center', order: [0, 9, 1, 8, 2, 7, 3, 6, 4, 5] },
];

const ORDER_BY_LABEL = new Map(ORDERS.map((row) => [row.label, row]));

const AnchorDemo = () => (
  <Demonstrator
    rows={axis(ANCHORS)}
    cell={(anchor) => (
      <Text className="variable-type__size-20">
        Aria found the <Emphasis trigger="loop" anchor={anchor} from={300} to={900} duration={1600}>Hookshot</Emphasis> in the Swamp Palace.
      </Text>
    )}
  />
);

const WaveOrderRow = ({ label }: { label: string }) => {
  const row = ORDER_BY_LABEL.get(label);
  if (!row) return null;
  return (
    <Text className="variable-type__size-32">
      <Emphasis trigger="loop" anchor={row.anchor} order={row.order} from={200} to={900} duration={1400} stagger={90}>Multiworld</Emphasis>
    </Text>
  );
};

const WaveOrderDemo = () => (
  <Demonstrator rows={axis(ORDERS.map((row) => row.label))} cell={(label) => <WaveOrderRow label={label} />} />
);

export { AnchorDemo, WaveOrderDemo };
