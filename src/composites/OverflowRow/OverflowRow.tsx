/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { splitEnd } from './behavior/split-end';
import { renderNode } from './behavior/render-node';
import { useOverflowFold } from './behavior/useOverflowFold';
import { OverflowRowMeasure } from './sub-components/OverflowRowMeasure';
import { OverflowRowMore } from './sub-components/OverflowRowMore';
import type { OverflowRowProps } from './OverflowRow.type';
import './OverflowRow.css';

const OverflowRow = (props: OverflowRowProps) => {
  const { items, moreLabel, className } = props;
  const { items: strings } = useTesseraStrings();
  const rowRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const { folded: foldedIds, tight } = useOverflowFold({ rowRef, measureRef, items });
  const folded = items.filter((item) => foldedIds.includes(item.id));
  const shown = items.filter((item) => !foldedIds.includes(item.id));
  const label = moreLabel ?? strings.more;
  const { start, end } = splitEnd(items, shown);

  return (
    <Box ref={rowRef} className={className ? `overflow-row ${className}` : 'overflow-row'}>
      {start.map((item) => <Box key={item.id}>{renderNode(item.node, tight)}</Box>)}
      {folded.length > 0 && <OverflowRowMore folded={folded} label={label} />}
      {end.map((item, index) => <Box key={item.id} className={index === 0 ? 'overflow-row__end' : undefined}>{renderNode(item.node, tight)}</Box>)}
      <OverflowRowMeasure measureRef={measureRef} items={items} label={label} />
    </Box>
  );
};

export { OverflowRow };
