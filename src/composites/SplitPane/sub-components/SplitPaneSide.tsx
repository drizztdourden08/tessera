/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { PaneRail } from '../../pane-edge/PaneRail';
import { isLined } from '../behavior/is-lined';
import { paneClass } from '../behavior/pane-class';
import { SplitPaneSummary } from './SplitPaneSummary';
import type { SplitPaneSideProps } from './SplitPaneSide.type';

const SplitPaneSide = (props: SplitPaneSideProps) => {
  const { id, fold, label, side, orientation, summary, header, children } = props;
  const lined = isLined(orientation, summary, header);

  return (
    <Box id={id} className={paneClass(fold.collapsed, lined)}>
      {fold.collapsed && <PaneRail rail={{ label, side, orientation, onUnfold: fold.toggle }} />}
      {fold.collapsed && lined && <SplitPaneSummary summary={summary} header={header} />}
      {children}
    </Box>
  );
};

export { SplitPaneSide };
