/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { splitColumns } from '../behavior/split-columns';
import { useRowActions } from '../behavior/useRowActions';
import type { RowGridRowProps } from '../RowGrid.type';
import { RowEnd } from './RowEnd';
import { RowGridCell } from './RowGridCell';
import { RowHandle } from './RowHandle';
import './RowGridRow.css';

const RowGridRow = <Row,>({ row, index, shared }: RowGridRowProps<Row>) => {
  const { columns, layout, numbered, total, drag } = shared;
  const rowId = useId();
  const { key, name, group, step, remove, menu } = useRowActions(shared, row, index);
  const { inRow, below } = splitColumns(columns, layout);
  const ended = remove !== undefined || step !== undefined || menu.length > 0;
  return (
    <Box as="li" className="row-grid__item" data-row-index={index} data-row-key={key} data-drop={drag.dropMark(index, total)}>
      <Box role="group" aria-label={group} className="row-grid__row" data-dragging={drag.dragging === index ? 'yes' : undefined}>
        {step && <RowHandle name={name} index={index} total={total} drag={drag} onStep={step} />}
        {numbered && <Span className="row-grid__number" aria-hidden>{index + 1}</Span>}
        {inRow.map((column) => <RowGridCell key={column.id} column={column} row={row} index={index} rowId={rowId} look="hidden" />)}
        {below.length > 0 && (
          <Box className="row-grid__below">
            {below.map((column) => (
              <RowGridCell key={column.id} column={column} row={row} index={index} rowId={rowId} look={layout === 'cards' && !column.fold ? 'above' : 'inline'} />
            ))}
          </Box>
        )}
        {ended && <RowEnd name={name} index={index} total={total} menu={menu} onRemove={remove} onStep={step} />}
      </Box>
    </Box>
  );
};

export { RowGridRow };
