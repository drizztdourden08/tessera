/* @layer stories @kind component */
import { useMemo } from 'react';
import { VirtualGrid } from '../../../src/composites';
import type { VirtualGridRowHeight } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { cardsOf } from './virtual-grid-samples.constants';
import type { CardEntry } from './virtual-grid-samples.constants';

interface VirtualGridMeasuredProps {
  sections: number;
  perSection: number;
  rowHeight?: VirtualGridRowHeight;
}

const renderCard = (card: CardEntry) => (
  <Box className="virtual-grid-story__card">
    <Text>{card.name}</Text>
    {Array.from({ length: card.lines }, (_, line) => <Text key={line} tone="dim">{`Line ${line + 1}`}</Text>)}
  </Box>
);

const VirtualGridMeasured = (props: VirtualGridMeasuredProps) => {
  const { sections, perSection, rowHeight = 'measured' } = props;
  const groups = useMemo(() => cardsOf(sections, perSection), [sections, perSection]);
  return (
    <Box className="virtual-grid-story">
      <VirtualGrid
        label="Cards"
        sections={groups}
        getKey={(card) => card.id}
        renderItem={renderCard}
        tileWidth="size-128"
        tileHeight="size-48"
        rowHeight={rowHeight}
      />
    </Box>
  );
};

export { VirtualGridMeasured };
