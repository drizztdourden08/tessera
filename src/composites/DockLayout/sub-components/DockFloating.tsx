/* @layer renderer-components @kind component */
import { floatTargets } from '../behavior/float-targets';
import { floatingRect } from '../behavior/floating-rect';
import { FloatingFrame } from './FloatingFrame';
import type { DockFloatingProps } from './DockFloating.type';

const DockFloating = (props: DockFloatingProps) => {
  const { floating, mainRect, stage, floatSnap, drag, dragId, min, resizable, onEdit, renderFloating } = props;
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
        snap={floatSnap > 0 ? { distance: floatSnap, targets: floatTargets(stage, mainRect, floating, entry.id) } : null}
        onEdit={onEdit}
        renderFloating={renderFloating}
      />
    );
  });
};

export { DockFloating };
