/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
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

  return (
    <Box ref={rowRef} className={className ? `overflow-row ${className}` : 'overflow-row'}>
      {shown.map((item) => <Box key={item.id}>{renderNode(item.node, tight)}</Box>)}
      {folded.length > 0 && <OverflowRowMore folded={folded} label={label} />}
      <OverflowRowMeasure measureRef={measureRef} items={items} label={label} />
    </Box>
  );
};

export { OverflowRow };
