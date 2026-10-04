/* @layer renderer-components @kind component */
import { floatingRect } from '../behavior/floating-rect';
import { FloatingFrame } from './FloatingFrame';
import type { DockFloatingProps } from './DockFloating.type';

const DockFloating = (props: DockFloatingProps) => {
  const { floating, mainRect, drag, dragId, min, resizable, onEdit, renderFloating } = props;
  return floating.map((entry) => {
    const live = drag?.floatingRect && dragId === entry.id ? drag.floatingRect : null;
    return (
      <FloatingFrame
        key={entry.id}
        entry={entry}
        rect={live ?? floatingRect(entry, mainRect)}
        bounds={mainRect}
        min={min}
        resizable={resizable && live === null}
        onEdit={onEdit}
        renderFloating={renderFloating}
      />
    );
  });
};

export { DockFloating };
