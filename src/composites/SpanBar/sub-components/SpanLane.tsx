/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Box } from '../../../primitives/Box';
import { borderX, cellCount, spanBox } from '../../cell-geometry';
import { useLaneCreate } from '../behavior/useLaneCreate';
import type { SpanLaneProps } from './SpanLane.type';

const SpanLane = (props: SpanLaneProps) => {
  const { cells, count, onCreate, readOnly = false, label, className, children } = props;
  const total = cellCount(cells, count);
  const create = useLaneCreate({ cells, total, readOnly, onCreate });
  const box = create.draft ? spanBox(cells, create.draft, total) : null;
  const placed = {
    '--span-lane-width': `${borderX(cells, total, total)}px`,
    '--span-left': `${box?.left ?? 0}px`,
    '--span-width': `${box?.width ?? 0}px`,
  } as CSSProperties;

  return (
    <Box
      role="group"
      aria-label={label}
      className={['span-lane', className].filter(Boolean).join(' ')}
      style={placed}
      data-creating={box !== null || undefined}
      onPointerDown={create.press}
    >
      {children}
      {box && <Box className="span-lane__draft" aria-hidden="true" />}
    </Box>
  );
};

export { SpanLane };
