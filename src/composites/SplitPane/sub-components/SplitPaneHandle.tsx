/* @layer renderer-components @kind component */
import { Icon, Span } from '../../../primitives';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ResizeHandle } from '../../ResizeHandle/ResizeHandle';
import { hiddenLabelOf } from '../behavior/hidden-label-of';
import { startShareOf } from '../behavior/start-share-of';
import { valueRangeOf } from '../behavior/value-range-of';
import { KEY_STEP, KEY_STEP_LARGE } from '../SplitPane.constants';
import type { SplitPaneHandleProps } from './SplitPaneHandle.type';

const SplitPaneHandle = (props: SplitPaneHandleProps) => {
  const { split, orientation, startLabel, endLabel, controls } = props;
  const { navigation } = useTesseraStrings();
  const hidden = hiddenLabelOf(split.collapsed, startLabel, endLabel);
  const range = valueRangeOf(split.limits);

  return (
    <ResizeHandle
      className={hidden === null ? undefined : `split-pane__rail split-pane__rail--${split.collapsed}`}
      orientation={orientation}
      label={hidden === null ? navigation.resizePanes(startLabel, endLabel) : navigation.showPane(hidden)}
      title={hidden === null ? navigation.resizeHint : navigation.showPane(hidden)}
      value={startShareOf(split.collapsed, split.ratio) * 100}
      min={range.min}
      max={range.max}
      step={KEY_STEP}
      largeStep={KEY_STEP_LARGE}
      controls={controls}
      pixelsPerUnit={split.pixelsPerUnit}
      onResize={split.onResize}
      onDragChange={split.onDragChange}
      onReset={split.expand}
      onClick={hidden === null ? undefined : split.expand}
    >
      {hidden === null ? undefined : <Span tone="dim" className="split-pane__rail-label"><Icon name="chevron-down" size={10} /> {hidden}</Span>}
    </ResizeHandle>
  );
};

export { SplitPaneHandle };
