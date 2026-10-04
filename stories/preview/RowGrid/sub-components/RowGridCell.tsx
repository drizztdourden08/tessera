/* @layer stories @kind component */
import { useContext, useMemo } from 'react';
import { Box, Span } from '../../../../src/primitives';
import { FieldControlContext } from '../../../../src/primitives/field-control/field-control-context';
import type { RowGridCellProps } from '../RowGrid.type';

const LABEL_CLASS = { hidden: 'row-grid__label visually-hidden', above: 'row-grid__label', inline: 'row-grid__label row-grid__label--inline' } as const;

const RowGridCell = <Row,>(props: RowGridCellProps<Row>) => {
  const { column, row, index, rowId, look } = props;
  const { size } = useContext(FieldControlContext);
  const error = column.error?.(row);
  const id = `${rowId}-${column.id}`;
  const control = useMemo(
    () => ({ id, labelId: `${id}-label`, describedBy: error ? `${id}-error` : undefined, invalid: error !== undefined, size }),
    [id, error, size],
  );
  return (
    <Box className={`row-grid__cell row-grid__cell--${look}`} data-cell={column.id} data-invalid={error ? 'yes' : undefined}>
      <Box as="label" id={control.labelId} className={LABEL_CLASS[look]} {...{ htmlFor: id }}>{column.label}</Box>
      <Box className="row-grid__control">
        <FieldControlContext.Provider value={control}>{column.cell(row, index)}</FieldControlContext.Provider>
        {error && <Span id={control.describedBy} tone="danger" className="row-grid__error">{error}</Span>}
      </Box>
    </Box>
  );
};

export { RowGridCell };
