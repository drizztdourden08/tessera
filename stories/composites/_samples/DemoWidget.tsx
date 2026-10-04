/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Widget } from '../../../src/composites';
import type { MenuGroup } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { WIDGET_CONTENT } from './data-widget-panels';
import type { FrameTabs } from './frame-tabs';
import type { DemoPanelProps } from './useWidgetOptionsDemo';

type DemoWidgetProps = {
  view: FrameTabs;
  panel: DemoPanelProps;
  peek: boolean;
  square?: boolean;
  canPopOut: boolean;
  options: readonly MenuGroup[];
  onActivateTab: (id: string) => void;
  onClose: () => void;
  titleBarActions?: ReactNode;
};

const DemoWidget = (props: DemoWidgetProps) => {
  const { view, panel, peek, square, canPopOut, options, onActivateTab, onClose, titleBarActions } = props;
  return (
    <Box className={`widget-story__box${peek ? ' widget-story__box--peek' : ''}`}>
      <Widget
        id={view.activeId}
        tabs={view.tabs}
        activeId={view.activeId}
        paneKey={panel.placement === 'docked' ? 'demo' : null}
        opacity={panel.opacity}
        peek={peek}
        square={square}
        options={options}
        mode={panel.placement === 'popped' ? 'out' : 'in'}
        pin={panel.pin}
        onPinChange={panel.onPinChange}
        titleBarActions={titleBarActions}
        canPopOut={canPopOut}
        onPopOut={panel.onPopOut}
        onActivateTab={onActivateTab}
        onClose={onClose}
      >
        {view.activeId === 'players' ? WIDGET_CONTENT.players : WIDGET_CONTENT.hints}
      </Widget>
    </Box>
  );
};

export { DemoWidget };
