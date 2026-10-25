/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import { TOOLBAR_END_LARGE_STEP, TOOLBAR_END_STEP } from '../ToolbarDock.constants';
import { toolbarEndRange } from '../behavior/toolbar-end-range';
import { toolbarOrientation } from '../behavior/toolbar-orientation';
import type { ToolbarDockEndProps } from './ToolbarDockEnd.type';

const ToolbarDockEnd = ({ id, label, end, side, layout, metrics, handlers }: ToolbarDockEndProps) => {
  const { toolbars } = useTesseraStrings();
  const range = metrics ? toolbarEndRange(layout, metrics, id, end) : null;
  const flip = (value: number): number => (range && end === 'end' ? range.span - value : value);
  const { onResize, onResizeEnd, onDragChange } = handlers;

  return (
    <ResizeHandle
      className={`toolbar-dock__end toolbar-dock__end--${end}`}
      orientation={toolbarOrientation(side)}
      edge={end}
      label={toolbars.resizeHandle(label, toolbars.ends[end])}
      value={range ? flip(range.value) : undefined}
      min={range ? Math.min(flip(range.min), flip(range.max)) : 0}
      max={range ? Math.max(flip(range.min), flip(range.max)) : 0}
      step={TOOLBAR_END_STEP}
      largeStep={TOOLBAR_END_LARGE_STEP}
      onResize={(next, change) => onResize(flip(next), change)}
      onResizeEnd={(next) => onResizeEnd(flip(next))}
      onDragChange={onDragChange}
    />
  );
};

export { ToolbarDockEnd };
