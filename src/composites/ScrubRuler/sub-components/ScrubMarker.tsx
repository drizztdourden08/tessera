/* @layer renderer-components @kind component */
import type { CSSProperties, KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { tagHueClass } from '../../../primitives/tag-hue/tag-hue-class';
import { markerKeyStep } from '../behavior/marker-key-step';
import { useMarkerDrag } from '../behavior/useMarkerDrag';
import type { ScrubMarkerProps } from './ScrubMarker.type';

const sideOf = (index: number, value: number): string => {
  if (index === value) return 'on';
  return index < value ? 'before' : 'after';
};

const ScrubMarker = (props: ScrubMarkerProps) => {
  const { cells, total, marker, value, readOnly, onMarkerChange } = props;
  const drag = useMarkerDrag({ cells, total, marker, readOnly, onMarkerChange });
  const center = (cells.lefts[drag.index] ?? 0) + (cells.widths[drag.index] ?? 0) / 2;
  const placed = { '--scrub-left': `${center}px` } as CSSProperties;

  const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (readOnly) return;
    const next = markerKeyStep(event.key, marker);
    if (next === null) return;
    event.preventDefault();
    onMarkerChange?.(marker.id, next);
  };

  return (
    <Box
      role="slider"
      tabIndex={readOnly ? -1 : 0}
      aria-label={marker.label}
      aria-valuemin={marker.min + 1}
      aria-valuemax={marker.max + 1}
      aria-valuenow={drag.index + 1}
      aria-readonly={readOnly || undefined}
      className={`scrub-ruler__marker ${tagHueClass(marker.tone)}`}
      style={placed}
      data-side={sideOf(drag.index, value)}
      data-dragging={drag.index !== marker.index || undefined}
      onPointerDown={drag.press}
      onKeyDown={onKeyDown}
    />
  );
};

export { ScrubMarker };
