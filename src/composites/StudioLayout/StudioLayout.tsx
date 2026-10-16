/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { HintScope } from '../../primitives/HintScope';
import { ToolFrame } from '../../primitives/ToolFrame';
import { ToolGroups } from '../../primitives/ToolGroups';
import { SidePanel } from '../SidePanel';
import type { SidePanelSide } from '../SidePanel/SidePanel.type';
import { useStudioStack } from './behavior/useStudioStack';
import { StudioLayoutHeader } from './sub-components/StudioLayoutHeader';
import { DEFAULT_EDITOR_MIN_WIDTH, STACKED_CLASS } from './StudioLayout.constants';
import type { StudioLayoutPanel, StudioLayoutProps } from './StudioLayout.type';
import './StudioLayout.css';

const sideOf = (side: SidePanelSide, panel: StudioLayoutPanel | undefined) => {
  if (!panel) return null;
  const { content, ...rest } = panel;
  return <SidePanel side={side} {...rest}>{content}</SidePanel>;
};

const StudioLayout = (props: StudioLayoutProps) => {
  const { editorLabel, children, bar, banner, start, end, toolbar, editorMinWidth = DEFAULT_EDITOR_MIN_WIDTH, className } = props;
  const refs = { root: useRef<HTMLElement>(null), body: useRef<HTMLElement>(null), editor: useRef<HTMLElement>(null) };
  const stacked = useStudioStack(refs, editorMinWidth, `${start !== undefined}:${end !== undefined}`);
  const rootClass = ['studio-layout', stacked && STACKED_CLASS, className].filter(Boolean).join(' ');
  return (
    <HintScope>
      <Box ref={refs.root} className={rootClass}>
        {bar && <StudioLayoutHeader bar={bar} />}
        {banner}
        <Box ref={refs.body} className="studio-layout__body">
          {sideOf('start', start)}
          <ToolFrame
            ref={refs.editor}
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
