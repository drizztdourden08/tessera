/* @layer renderer-components @kind component */
import { Box } from '../../primitives';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { startShareOf } from './behavior/start-share-of';
import { useSplitPane } from './behavior/useSplitPane';
import { SplitDivider } from './sub-components/SplitDivider';
import { DEFAULT_RATIO, DEFAULT_SNAP } from './SplitPane.constants';
import type { SplitPaneProps } from './SplitPane.type';
import './SplitPane.css';

const SplitPane = (props: SplitPaneProps) => {
  const {
    start, end, defaultRatio = DEFAULT_RATIO, snapAt = DEFAULT_SNAP, defaultCollapsed = 'none',
    startLabel, endLabel, className,
  } = props;

  const { navigation } = useTesseraStrings();
  const { trackRef, ratio, collapsed, dragging, ...handlers } = useSplitPane(defaultRatio, snapAt, defaultCollapsed);
  const startShare = startShareOf(collapsed, ratio);

  return (
    <Box
      ref={trackRef}
      className={`split-pane${dragging ? ' split-pane--dragging' : ''}${className ? ` ${className}` : ''}`}
      style={{ gridTemplateColumns: `minmax(0, ${startShare}fr) auto minmax(0, ${1 - startShare}fr)` }}
    >
      <Box className={`split-pane__pane${collapsed === 'start' ? ' split-pane__pane--hidden' : ''}`}>
        {start}
      </Box>

      <SplitDivider
        collapsed={collapsed}
        startShare={startShare}
        startLabel={startLabel ?? navigation.leftPane}
        endLabel={endLabel ?? navigation.rightPane}
        handlers={handlers}
      />

      <Box className={`split-pane__pane${collapsed === 'end' ? ' split-pane__pane--hidden' : ''}`}>
        {end}
      </Box>
    </Box>
  );
};

export { SplitPane };
