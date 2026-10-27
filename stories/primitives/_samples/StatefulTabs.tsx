/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Tabs, Text } from '../../../src/primitives';
import type { TabBadgeFill, TabItem } from '../../../src/primitives';

type StatefulTabsProps = {
  tabs: TabItem[];
  iconOnly?: boolean;
  size?: 'md' | 'lg';
  selectedTone?: 'accent' | 'neutral';
  badgeFill?: TabBadgeFill;
};

const StatefulTabs = (props: StatefulTabsProps) => {
  const { tabs, iconOnly, size, selectedTone, badgeFill } = props;
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const current = tabs.find((tab) => tab.id === active);
  return (
    <Box className="story-column">
      <Tabs tabs={tabs} activeTab={active} onTabChange={setActive} iconOnly={iconOnly} size={size} selectedTone={selectedTone} badgeFill={badgeFill} />
      <Text className="story-label">Active: {current?.label}</Text>
    </Box>
  );
};

export { StatefulTabs };
