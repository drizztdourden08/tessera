/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { HintScope } from '../../primitives/HintScope';
import { ToolFrame } from '../../primitives/ToolFrame';
import { ToolGroups } from '../../primitives/ToolGroups';
import { SidePanel } from '../SidePanel';
import type { SidePanelSide } from '../SidePanel/SidePanel.type';
import { StudioLayoutHeader } from './sub-components/StudioLayoutHeader';
import type { StudioLayoutPanel, StudioLayoutProps } from './StudioLayout.type';
import './StudioLayout.css';

const sideOf = (side: SidePanelSide, panel: StudioLayoutPanel | undefined) => {
  if (!panel) return null;
  const { content, ...rest } = panel;
  return <SidePanel side={side} {...rest}>{content}</SidePanel>;
};

const StudioLayout = (props: StudioLayoutProps) => {
  const { editorLabel, children, bar, banner, start, end, toolbar, className } = props;
  return (
    <HintScope>
      <Box className={className ? `studio-layout ${className}` : 'studio-layout'}>
        {bar && <StudioLayoutHeader bar={bar} />}
        {banner}
        <Box className="studio-layout__body">
          {sideOf('start', start)}
          <ToolFrame
            as="section"
            aria-label={editorLabel}
            padded
            className="studio-layout__editor"
            toolbar={toolbar && toolbar.length > 0 && <ToolGroups groups={toolbar} />}
          >
            {children}
          </ToolFrame>
          {sideOf('end', end)}
        </Box>
      </Box>
    </HintScope>
  );
};

export { StudioLayout };
