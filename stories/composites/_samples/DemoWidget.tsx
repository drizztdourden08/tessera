/* @layer stories @kind component */
import { Widget } from '../../../src/composites';
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
  optionsOpen: boolean;
  onActivateTab: (id: string) => void;
  onOpenOptions: (gear: HTMLElement) => void;
  onClose: () => void;
};

const DemoWidget = (props: DemoWidgetProps) => {
  const { view, panel, peek, square, canPopOut, optionsOpen, onActivateTab, onOpenOptions, onClose } = props;
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
        optionsOpen={optionsOpen}
        mode={panel.placement === 'popped' ? 'out' : 'in'}
        pin={panel.pin}
        onTop={panel.pin !== 'off'}
        onPinChange={panel.onPinChange}
        canPopOut={canPopOut}
        onPopOut={panel.onPopOut}
        onActivateTab={onActivateTab}
        onOpenOptions={onOpenOptions}
        onClose={onClose}
      >
        {view.activeId === 'players' ? WIDGET_CONTENT.players : WIDGET_CONTENT.hints}
      </Widget>
    </Box>
  );
};

export { DemoWidget };
