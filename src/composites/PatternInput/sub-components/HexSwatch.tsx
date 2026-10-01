/* @layer renderer-components @kind component */
import { ColorSwatch } from '../../../primitives/ColorSwatch';
import { preventTextSelection } from '../../../primitives/dom/prevent-text-selection';
import type { SegmentProps } from './TypedSegment.type';

const HexSwatch = (props: SegmentProps) => {
  const { field, slot, index } = props;
  const value = field.value[slot.name];
  const color = typeof value === 'string' ? value : null;

  return (
    <ColorSwatch
      color={color ?? ''}
      transparent={color === null}
      size={field.size}
      className="pattern-input__swatch"
      tabIndex={-1}
      aria-hidden="true"
      disabled={field.disabled}
      onMouseDown={preventTextSelection}
      onClick={() => field.moveTo(index, 'all')}
    />
  );
};

export { HexSwatch };
