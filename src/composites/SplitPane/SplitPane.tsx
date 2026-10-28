/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PaneEdge } from '../pane-edge/PaneEdge';
import { splitOptionsOf } from './behavior/split-options-of';
import { useSplitPane } from './behavior/useSplitPane';
import { SplitPaneSide } from './sub-components/SplitPaneSide';
import type { SplitPaneProps } from './SplitPane.type';
import './SplitPane.css';

const SplitPane = (props: SplitPaneProps) => {
  const { start, end, summary, header, className } = props;
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
  const line = { orientation, summary, header };

  return (
    <Box ref={split.panesRef} className={classes.filter(Boolean).join(' ')} style={template}>
      <SplitPaneSide {...line} id={startId} fold={startFold} label={startLabel} side="start">{start}</SplitPaneSide>

      <PaneEdge
        handle={split.handle}
        orientation={orientation}
        start={{ fold: startFold, collapsible, id: startId, label: startLabel }}
        end={{ fold: endFold, collapsible, id: endId, label: endLabel }}
      />

      <SplitPaneSide {...line} id={endId} fold={endFold} label={endLabel} side="end">{end}</SplitPaneSide>
    </Box>
  );
};

export { SplitPane };
