/* @layer renderer-components @kind component */
import { Box } from '../../primitives';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { splitOptionsOf } from './behavior/split-options-of';
import { startShareOf } from './behavior/start-share-of';
import { useSplitPane } from './behavior/useSplitPane';
import { valueRangeOf } from './behavior/value-range-of';
import { SplitDivider } from './sub-components/SplitDivider';
import type { SplitPaneProps } from './SplitPane.type';
import './SplitPane.css';

const SplitPane = (props: SplitPaneProps) => {
  const { start, end, startLabel, endLabel, className } = props;
  const options = splitOptionsOf(props);
  const { orientation } = options;
  const { navigation } = useTesseraStrings();
  const { trackRef, ratio, collapsed, dragging, limits, ...handlers } = useSplitPane(options);
  const startShare = startShareOf(collapsed, ratio);
  const template = `minmax(0, ${startShare}fr) auto minmax(0, ${1 - startShare}fr)`;
  const classes = ['split-pane', `split-pane--${orientation}`, dragging && 'split-pane--dragging', className];

  return (
    <Box
      ref={trackRef}
      className={classes.filter(Boolean).join(' ')}
      style={orientation === 'vertical' ? { gridTemplateRows: template } : { gridTemplateColumns: template }}
    >
      <Box className={`split-pane__pane${collapsed === 'start' ? ' split-pane__pane--hidden' : ''}`}>
        {start}
      </Box>

      <SplitDivider
        collapsed={collapsed}
        orientation={orientation}
        value={Math.round(startShare * 100)}
        valueRange={valueRangeOf(limits)}
        startLabel={startLabel ?? navigation.firstPane}
        endLabel={endLabel ?? navigation.secondPane}
        handlers={handlers}
      />

      <Box className={`split-pane__pane${collapsed === 'end' ? ' split-pane__pane--hidden' : ''}`}>
        {end}
      </Box>
    </Box>
  );
};

export { SplitPane };
