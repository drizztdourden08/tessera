/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Tabs } from '../../../primitives/Tabs';
import { MODE_LABELS } from '../behavior/color-modes.constants';
import type { ModeTabsProps } from './ModePanel.type';

const ColorModeTabs = ({ modes, mode, onModeChange }: ModeTabsProps) => (
  <Box className="color-picker__modes">
    <Tabs
      tabs={modes.map((id) => ({ id, label: MODE_LABELS[id] }))}
      activeTab={mode}
      onTabChange={(id) => onModeChange(id as typeof mode)}
    />
  </Box>
);

export { ColorModeTabs };
