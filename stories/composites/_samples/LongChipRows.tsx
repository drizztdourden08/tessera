/* @layer stories @kind component */
import { useState } from 'react';
import { SettingsPage } from '../../../src/composites';
import type { HeaderAnchorNavItem } from '../../../src/composites';
import { Box, Icon, Paragraph, Text } from '../../../src/primitives';

const GAME_SECTIONS: readonly HeaderAnchorNavItem[] = [
  { id: 'flow', label: 'Game Flow' },
  { id: 'received', label: 'Received Items' },
  { id: 'movement', label: 'Movement' },
  { id: 'combat', label: 'Combat' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'comfort', label: 'Quality of Life' },
  { id: 'cheats', label: 'Cheats' },
  { id: 'tracker', label: 'Tracker' },
  { id: 'vanilla', label: 'Vanilla Safe' },
];

const WIDTHS = [
  { id: 'wide', label: 'Wide: every chip fits beside the title' },
  { id: 'medium', label: 'Narrower: the chips scroll beside the title' },
  { id: 'narrow', label: 'Narrow: the chips move under the title and scroll there' },
];

const ChipFrame = (props: { width: string; label: string }) => {
  const [active, setActive] = useState('flow');
  return (
    <Box className="story-column">
      <Text className="story-label">{props.label}</Text>
      <Box className={`story-frame settings-page-story__chips settings-page-story__chips--${props.width}`}>
        <SettingsPage icon={<Icon name="gamepad-2" />} title="Game" tabs={{ items: GAME_SECTIONS, activeId: active, onSelect: setActive }} scroll={false}>
          <Paragraph tone="muted">Showing {active}.</Paragraph>
        </SettingsPage>
      </Box>
    </Box>
  );
};

const LongChipRows = () => (
  <Box className="story-column">
    {WIDTHS.map((width) => <ChipFrame key={width.id} width={width.id} label={width.label} />)}
  </Box>
);

export { LongChipRows };
