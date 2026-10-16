/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { CardHeader } from '../../../primitives/Card/sub-components/CardHeader';
import { PaneFoldButton } from '../../pane-fold/PaneFoldButton';
import { PaneRail } from '../../pane-fold/PaneRail';
import type { SidePanelPaneProps } from './SidePanelPane.type';

const SidePanelPane = (props: SidePanelPaneProps) => {
  const { id, title, side, level, actions, collapsible, fold, children } = props;
  const button = collapsible && (
    <PaneFoldButton fold={fold} label={title} controls={id} icon={side === 'end' ? 'panel-right' : 'panel-left'} />
  );
  const tools = collapsible || actions !== undefined ? <Box className="side-panel__tools">{actions}{button}</Box> : undefined;
  return (
    <Box as="aside" id={id} surface="raised" aria-label={title} className="side-panel__pane">
      {fold.collapsed ? <PaneRail rail={{ label: title, onUnfold: fold.toggle }}>{button}</PaneRail> : (
        <>
          <CardHeader title={title} level={level} actions={tools} />
          <Box className="side-panel__body">{children}</Box>
        </>
      )}
    </Box>
  );
};

export { SidePanelPane };
