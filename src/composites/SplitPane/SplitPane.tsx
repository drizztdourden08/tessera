/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { splitOptionsOf } from './behavior/split-options-of';
import { startShareOf } from './behavior/start-share-of';
import { useSplitPane } from './behavior/useSplitPane';
import { SplitPaneHandle } from './sub-components/SplitPaneHandle';
import type { SplitPaneProps } from './SplitPane.type';
import './SplitPane.css';

const SplitPane = (props: SplitPaneProps) => {
  const { start, end, startLabel, endLabel, className } = props;
  const options = splitOptionsOf(props);
  const { orientation } = options;
  const { navigation } = useTesseraStrings();
  const startId = useId();
  const split = useSplitPane(options);
  const { trackRef, collapsed, dragging } = split;
  const startShare = startShareOf(collapsed, split.ratio);
  const template = `minmax(0, ${startShare}fr) auto minmax(0, ${1 - startShare}fr)`;
  const classes = ['split-pane', `split-pane--${orientation}`, dragging && 'split-pane--dragging', className];

  return (
    <Box
      ref={trackRef}
      className={classes.filter(Boolean).join(' ')}
      style={orientation === 'vertical' ? { gridTemplateRows: template } : { gridTemplateColumns: template }}
    >
      <Box id={startId} className={`split-pane__pane${collapsed === 'start' ? ' split-pane__pane--hidden' : ''}`}>
        {start}
      </Box>

      <SplitPaneHandle
        split={split}
        orientation={orientation}
        startLabel={startLabel ?? navigation.firstPane}
        endLabel={endLabel ?? navigation.secondPane}
        controls={startId}
      />

      <Box className={`split-pane__pane${collapsed === 'end' ? ' split-pane__pane--hidden' : ''}`}>
        {end}
      </Box>
    </Box>
  );
};

export { SplitPane };
