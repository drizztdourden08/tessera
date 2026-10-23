/* @layer renderer-components @kind component */
import { ColorSwatch } from '../../../primitives/ColorSwatch';
import { cellMarks } from '../behavior/cell-marks';
import { cellPointer } from '../behavior/cell-pointer';
import type { SwatchCellProps } from '../SwatchGrid.type';
import './SwatchCell.css';

const SwatchCell = (props: SwatchCellProps) => {
  const { color, index, name, size, showIndex, selected, inRange, tabbable, drag, onPick } = props;
  return (
    <ColorSwatch
      role="option"
      aria-selected={selected || inRange}
      aria-label={name}
      color={color.value ?? ''}
      transparent={color.value === null}
      caption={showIndex ? index : undefined}
      selected={selected}
      size={size}
      className="swatch-grid__swatch"
      tabIndex={tabbable ? 0 : -1}
      data-swatch-index={index}
      data-swatch-key={color.id}
      {...cellMarks(props)}
      onClick={(event) => onPick(index, event)}
      {...cellPointer(drag, index)}
    />
  );
};

export { SwatchCell };
