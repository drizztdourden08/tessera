/* @layer stories @kind story */
import { useState } from 'react';
import { SpanBar, SpanLane } from '../../../src/composites';
import type { CellSpan } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { TIME_CELLS, UNIFORM_CELLS } from './cell-demo';
import type { SpanBarDemoProps } from './SpanBarDemo.type';

const SpanBarDemo = (props: SpanBarDemoProps) => {
  const { time = false, lane = false, selected = false, readOnly = false, colour, snap = 'cell', label = 'Walk' } = props;
  const cells = time ? TIME_CELLS : UNIFORM_CELLS;
  const [span, setSpan] = useState<CellSpan>({ start: 2, end: 5 });
  const [made, setMade] = useState<readonly CellSpan[]>([]);
  const [note, setNote] = useState('');
  return (
    <Box className="story-column">
      <SpanLane cells={cells} readOnly={readOnly || !lane} onCreate={(next) => setMade([...made, next])} label="Frames">
        <SpanBar
          start={span.start}
          end={span.end}
          cells={cells}
          onChange={setSpan}
          announce={setNote}
          label={label}
          selected={selected}
          readOnly={readOnly}
          colour={colour}
          snap={snap}
        >
          {label}
        </SpanBar>
        {made.map((item) => (
          <SpanBar key={`${item.start}:${item.end}`} start={item.start} end={item.end} cells={cells} label="New" colour="teal" readOnly>
            New
          </SpanBar>
        ))}
      </SpanLane>
      <Box role="status" className="story-label">{note}</Box>
    </Box>
  );
};

export { SpanBarDemo };
