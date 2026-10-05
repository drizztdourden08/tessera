/* @layer stories @kind component */
import { useState } from 'react';
import { ShortcutList } from '../../../src/composites';
import { Box, Button, Card, Icon, IconButton, StatRow, Text, Toggle } from '../../../src/primitives';
import type { IconName } from '../../../src/primitives';
import type { TourDemoScreenProps } from './TourDemo.type';

const PAGES: readonly { icon: IconName; label: string }[] = [
  { icon: 'house', label: 'Home' },
  { icon: 'gamepad-2', label: 'Games' },
  { icon: 'users', label: 'Friends' },
  { icon: 'trophy', label: 'Goals' },
];

const TourDemoScreen = (props: TourDemoScreenProps) => {
  const { parts, tour, settingsOpen, startAt, lifted } = props;
  const [pinned, setPinned] = useState(false);
  return (
    <Box className="tour-demo">
      <Box ref={parts.titlebar} as="header" className={lifted ? 'tour-demo__titlebar tour-demo__titlebar--lifted' : 'tour-demo__titlebar'}>
        <Text variant="label">Relay</Text>
        <IconButton label="Keep on top" variant="ghost" size="xs" active={pinned} onClick={() => setPinned(!pinned)}>
          <Icon name={pinned ? 'pin' : 'pin-off'} size={14} />
        </IconButton>
        <IconButton label="Close the window" variant="ghost" size="xs" onClick={() => undefined}>
          <Icon name="x" size={14} />
        </IconButton>
      </Box>
      <Box ref={parts.nav} as="nav" className="tour-demo__nav" aria-label="Pages">
        {PAGES.map((page, index) => (
          <Box key={page.label} as="span" className={index === 0 ? 'tour-demo__page tour-demo__page--on' : 'tour-demo__page'}>
            <Icon name={page.icon} size={16} />
            {page.label}
          </Box>
        ))}
      </Box>
      <Box className="tour-demo__main">
        <Box as="header" className="tour-demo__header">
          <Text variant="title">Home</Text>
          <Button ref={parts.restart} variant="secondary" size="sm" onClick={() => tour.start(startAt)}>Start tour</Button>
          <IconButton ref={parts.gear} label="Settings" variant="ghost" active={settingsOpen} onClick={() => parts.setSettings(!settingsOpen)}>
            <Icon name="settings" size={16} />
          </IconButton>
        </Box>
        <Box ref={parts.cards} className="tour-demo__cards">
          <Card title="Time played"><StatRow label="This week" value="12 h 40 min" /></Card>
          <Card title="Seeds"><StatRow label="Finished" value="3 of 5" /></Card>
          <Card title="Friends"><StatRow label="Online" value="4" /></Card>
        </Box>
        <Card title="Keys of the tour">
          <ShortcutList items={tour.shortcuts} />
        </Card>
      </Box>
      {settingsOpen && (
        <Box ref={parts.settings} as="aside" className="tour-demo__settings" aria-label="Settings">
          <Card title="Settings">
            <Box className="tour-demo__settings-rows">
              <Toggle checked label="Show friends online" onChange={() => undefined} />
              <Toggle checked={false} label="Compact cards" onChange={() => undefined} />
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export { TourDemoScreen };
