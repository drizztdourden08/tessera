/* @layer renderer-components @kind component */
import { Box, Text } from '../../../primitives';
import { hiddenLabelOf } from '../behavior/hiddenLabelOf';
import type { SplitDividerProps } from './SplitDivider.type';
import '../../../theme/focus-ring.css';

const SplitDivider = (props: SplitDividerProps) => {
  const { collapsed, startShare, startLabel, endLabel, handlers } = props;
  const hidden = hiddenLabelOf(collapsed, startLabel, endLabel);

  return (
    <Box
      className={`split-pane__divider split-pane__divider--${collapsed} focus-ring-inset`}
      role="separator"
      aria-orientation="vertical"
      aria-label={hidden !== null ? `Show ${hidden}` : `Resize ${startLabel} and ${endLabel}`}
      aria-valuenow={Math.round(startShare * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onPointerDown={handlers.handlePointerDown}
      onPointerMove={handlers.handlePointerMove}
      onPointerUp={handlers.endDrag}
      onPointerCancel={handlers.endDrag}
      onKeyDown={handlers.handleKeyDown}
      onClick={hidden !== null ? handlers.expand : undefined}
      onDoubleClick={handlers.expand}
      title={hidden !== null ? `Show ${hidden}` : 'Drag to resize · double-click to reset'}
    >
      {hidden !== null
        ? <Text className="split-pane__rail-label">{collapsed === 'start' ? '›' : '‹'} {hidden}</Text>
        : <Box className="split-pane__grip" />}
    </Box>
  );
};

export { SplitDivider };
