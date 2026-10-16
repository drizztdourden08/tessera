/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { CardHeader } from '../../../primitives/Card/sub-components/CardHeader';
import { PaneRail } from '../../pane-fold/PaneRail';
import type { SidePanelPaneProps } from './SidePanelPane.type';

const SidePanelPane = (props: SidePanelPaneProps) => {
  const { id, title, level, actions, rail, fold, children } = props;
  const { collapsed } = fold;
  const tools = actions === undefined ? undefined : <Box className="side-panel__tools">{actions}</Box>;
  return (
    <Box as="aside" id={id} surface={collapsed ? undefined : 'raised'} aria-label={title} className="side-panel__pane">
      {collapsed && <PaneRail rail={{ label: title, onUnfold: fold.toggle, content: rail }} />}
      <CardHeader title={title} level={level} actions={tools} />
      <Box className="side-panel__body">{children}</Box>
    </Box>
  );
};

export { SidePanelPane };
