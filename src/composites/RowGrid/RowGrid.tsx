/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { FieldControlContext } from '../../primitives/field-control/field-control-context';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import '../../theme/control-size.css';
import '../../theme/visually-hidden.css';
import { moveBetweenRows } from './behavior/move-between-rows';
import { useRowGridModel } from './behavior/useRowGridModel';
import { CONTROL_SIZE } from './RowGrid.constants';
import type { RowGridProps } from './RowGrid.type';
import { RowGridEmpty } from './sub-components/RowGridEmpty';
import { RowGridFoot } from './sub-components/RowGridFoot';
import { RowGridHead } from './sub-components/RowGridHead';
import { RowGridRow } from './sub-components/RowGridRow';
import './RowGrid.css';

const RowGrid = <Row,>(props: RowGridProps<Row>) => {
  const { rowGrid } = useTesseraStrings();
  const { label, rows, columns, addLabel = rowGrid.add, summary, empty = rowGrid.empty, className } = props;
  const { rootRef, listRef, parts, layout, focus, control, shared, add } = useRowGridModel(props);
  const filled = rows.length > 0;
  const labels = columns.filter((column) => layout === 'table' || !column.fold).map((column) => column.label);
  const classes = ['row-grid', `row-grid--${layout}`, `row-grid--${parts.density}`, `control-size--${CONTROL_SIZE[parts.density]}`, className];
  return (
    <Box as="section" ref={rootRef} className={classes.filter(Boolean).join(' ')} aria-label={label} data-layout={layout}>
      <FieldControlContext.Provider value={control}>
        {!filled && <RowGridEmpty message={empty} onAdd={add} addLabel={addLabel} />}
        {filled && layout !== 'cards' && <RowGridHead labels={labels} handle={parts.handle} numbered={parts.numbered} end={parts.endButtons > 0} />}
        {filled && (
          <Box as="ol" ref={listRef} className="row-grid__rows" onKeyDown={moveBetweenRows}>
            {rows.map((row, index) => <RowGridRow key={shared.rowKey(row)} row={row} index={index} shared={shared} />)}
          </Box>
        )}
        {filled && <RowGridFoot onAdd={add} addLabel={addLabel} summary={summary} />}
      </FieldControlContext.Provider>
      <Box className="visually-hidden" aria-live="polite">{focus.message}</Box>
    </Box>
  );
};

export { RowGrid };
