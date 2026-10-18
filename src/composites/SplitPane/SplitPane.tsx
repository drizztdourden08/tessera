/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PaneEdge } from '../pane-edge/PaneEdge';
import { PaneRail } from '../pane-edge/PaneRail';
import { splitOptionsOf } from './behavior/split-options-of';
import { useSplitPane } from './behavior/useSplitPane';
import type { SplitPaneProps } from './SplitPane.type';
import './SplitPane.css';

const SplitPane = (props: SplitPaneProps) => {
  const { start, end, className } = props;
  const options = splitOptionsOf(props);
  const { orientation, collapsible } = options;
  const { navigation } = useTesseraStrings();
  const startId = useId();
  const endId = useId();
  const split = useSplitPane(options);
  const { startFold, endFold } = split;
  const startLabel = props.startLabel ?? navigation.firstPane;
  const endLabel = props.endLabel ?? navigation.secondPane;
  const classes = ['split-pane', `split-pane--${orientation}`, orientation === 'horizontal' && 'pane-edge-host', split.dragging && 'split-pane--dragging', className];
  const template = orientation === 'vertical' ? { gridTemplateRows: split.template } : { gridTemplateColumns: split.template };

  return (
    <Box ref={split.panesRef} className={classes.filter(Boolean).join(' ')} style={template}>
      <Box id={startId} className={`split-pane__pane${startFold.collapsed ? ' split-pane__pane--folded' : ''}`}>
        {startFold.collapsed && <PaneRail rail={{ label: startLabel, side: 'start', orientation, onUnfold: startFold.toggle }} />}
        {start}
      </Box>

      <PaneEdge
        handle={split.handle}
        orientation={orientation}
        start={{ fold: startFold, collapsible, id: startId, label: startLabel }}
        end={{ fold: endFold, collapsible, id: endId, label: endLabel }}
      />

      <Box id={endId} className={`split-pane__pane${endFold.collapsed ? ' split-pane__pane--folded' : ''}`}>
        {endFold.collapsed && <PaneRail rail={{ label: endLabel, side: 'end', orientation, onUnfold: endFold.toggle }} />}
        {end}
      </Box>
    </Box>
  );
};

export { SplitPane };
