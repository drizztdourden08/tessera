/* @layer stories @kind component */
import { useState } from 'react';
import { Box, Icon, Tabs, Text } from '../../../src/primitives';
import type { TabItem } from '../../../src/primitives';
import { LockedOptionsDemo } from '../../composites/_samples/LockedOptionsDemo';

const TABS: TabItem[] = [
  { id: 'general', label: 'General', icon: <Icon name="settings" /> },
  { id: 'controls', label: 'Controls', icon: <Icon name="gamepad-2" />, disabled: true, disabledReason: 'Connect a controller to set its buttons.' },
  { id: 'saves', label: 'Saves', icon: <Icon name="save" /> },
];

const ReasonCloseDemo = () => {
  const [tab, setTab] = useState('general');
  return (
    <Box className="story-column">
      <Text className="story-label">
        Click the Controls tab, the 144 Hz segment, the Fullscreen option, Adaptive or Temperature, then move away,
        press Tab, press Esc or click elsewhere: each reason closes, and none stays open after a click
      </Text>
      <Tabs tabs={TABS} activeTab={tab} onTabChange={setTab} />
      <LockedOptionsDemo />
    </Box>
  );
};

export { ReasonCloseDemo };
