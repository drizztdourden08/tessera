/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { EmptyState } from '../../primitives/EmptyState';
import { useControlSize } from '../../primitives/field-control/useControlSize';
import { Grid } from '../../primitives/Grid';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import '../../theme/visually-hidden.css';
import { inRange } from './behavior/in-range';
import { useSwatchGrid } from './behavior/useSwatchGrid';
import { CHORD_KEYS } from './SwatchGrid.constants';
import type { SwatchGridProps } from './SwatchGrid.type';
import { SwatchCell } from './sub-components/SwatchCell';
import './SwatchGrid.css';

const SwatchGrid = (props: SwatchGridProps) => {
  const { label, colors, columns, showIndex = true, selectedId, secondaryId, range, onMove, onRangeChange, empty, className } = props;
  const { swatchGrid } = useTesseraStrings();
  const size = useControlSize(props.size);
  const hintId = useId();
  const { listRef, drag, message, tabId, onKeyDown, onFocus, onPick, nameOf } = useSwatchGrid(props);
  if (colors.length === 0) return <EmptyState size="sm" className="swatch-grid__empty" message={empty ?? swatchGrid.empty} />;
  return (
    <Box ref={listRef} className={['swatch-grid', className].filter(Boolean).join(' ')}>
      <Grid
        role="listbox"
        aria-label={label}
        aria-describedby={hintId}
        aria-multiselectable={onRangeChange ? true : undefined}
        aria-keyshortcuts={onMove ? CHORD_KEYS : undefined}
        className="swatch-grid__cells"
        columns={columns}
        gap="2xs"
        data-size={size}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
      >
        {colors.map((color, index) => (
          <SwatchCell
            key={color.id}
            color={color}
            index={index}
            total={colors.length}
            name={nameOf(color, index)}
            size={size}
            showIndex={showIndex}
            selected={color.id === selectedId}
            secondary={color.id === secondaryId}
            inRange={inRange(index, range)}
            tabbable={color.id === tabId}
            drag={drag}
            onPick={onPick}
          />
        ))}
      </Grid>
      <Box id={hintId} className="visually-hidden">{swatchGrid.moveHint}</Box>
      <Box className="visually-hidden" aria-live="polite">{message}</Box>
    </Box>
  );
};

export { SwatchGrid };
