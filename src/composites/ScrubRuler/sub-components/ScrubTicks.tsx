/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { tickIndices } from '../behavior/tick-indices';
import type { ScrubTicksProps } from './ScrubTicks.type';

const ScrubTicks = ({ cells, total, current, every, tickLabel }: ScrubTicksProps) => {
  const labelled = new Set(tickIndices(cells, total, every));
  return Array.from({ length: total }, (_, index) => {
    const placed = { '--scrub-left': `${cells.lefts[index] ?? 0}px`, '--scrub-width': `${cells.widths[index] ?? 0}px` } as CSSProperties;
    return (
      <Box key={index} className="scrub-ruler__tick" style={placed} data-current={index === current || undefined} aria-hidden="true">
        {labelled.has(index) && <Text as="span" variant="caption" numeric className="scrub-ruler__label">{tickLabel(index)}</Text>}
      </Box>
    );
  });
};

export { ScrubTicks };
