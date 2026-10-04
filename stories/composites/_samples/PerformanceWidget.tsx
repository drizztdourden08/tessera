/* @layer stories @kind component */
import { Widget } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { PERFORMANCE_TABS } from './performance-panel.constants';
import { PerformancePanel } from './PerformancePanel';
import './PerformanceWidget.css';

const PerformanceWidget = () => (
  <Box className="performance-widget-story">
    <Widget
      id="performance"
      tabs={PERFORMANCE_TABS}
      activeId="performance"
      paneKey={null}
      opacity={1}
      canPopOut={false}
      onActivateTab={() => undefined}
      onOpenOptions={() => undefined}
      onClose={() => undefined}
    >
      <PerformancePanel />
    </Widget>
  </Box>
);

export { PerformanceWidget };
