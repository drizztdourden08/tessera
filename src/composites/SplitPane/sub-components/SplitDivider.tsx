/* @layer renderer-components @kind component */
import { Box, Glyph, Span } from '../../../primitives';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { hiddenLabelOf } from '../behavior/hidden-label-of';
import type { SplitDividerProps } from './SplitDivider.type';
import '../../../theme/focus-ring.css';

const SplitDivider = (props: SplitDividerProps) => {
  const { collapsed, orientation, startShare, valueRange, startLabel, endLabel, handlers } = props;
  const { navigation } = useTesseraStrings();
  const hidden = hiddenLabelOf(collapsed, startLabel, endLabel);

  return (
    <Box
      className={`split-pane__divider split-pane__divider--${collapsed} focus-ring-inset`}
      role="separator"
      aria-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
      aria-label={hidden !== null ? navigation.showPane(hidden) : navigation.resizePanes(startLabel, endLabel)}
      aria-valuenow={Math.round(startShare * 100)}
      aria-valuemin={valueRange.min}
      aria-valuemax={valueRange.max}
      tabIndex={0}
      onPointerDown={handlers.handlePointerDown}
      onPointerMove={handlers.handlePointerMove}
      onPointerUp={handlers.endDrag}
      onPointerCancel={handlers.endDrag}
      onKeyDown={handlers.handleKeyDown}
      onClick={hidden !== null ? handlers.expand : undefined}
      onDoubleClick={handlers.expand}
      title={hidden !== null ? navigation.showPane(hidden) : navigation.resizeHint}
    >
      {hidden !== null
        ? <Span tone="dim" className="split-pane__rail-label"><Glyph name="chevronDown" size={10} /> {hidden}</Span>
        : <Box className="split-pane__grip" />}
    </Box>
  );
};

export { SplitDivider };
