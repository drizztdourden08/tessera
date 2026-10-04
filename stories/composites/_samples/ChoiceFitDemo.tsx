/* @layer stories @kind story */
import { useState } from 'react';
import { SettingsRow, SettingsSection } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import './ChoiceFitDemo.css';

const RELEASE_OPTIONS = [
  { value: 'disabled', label: 'Disabled', hint: 'Nobody can release.' },
  { value: 'enabled', label: 'Enabled', hint: 'A player can release with a command.' },
  { value: 'auto', label: 'Auto', hint: 'Items release when a player reaches the goal.' },
  { value: 'auto-enabled', label: 'Auto and enabled', hint: 'Both: by command, and at the goal.' },
  { value: 'goal', label: 'After goal', hint: 'A player can release once at the goal.' },
] as const;

const WIDTHS = [{ label: 'Wide row: the options fit', className: 'choice-fit-demo__wide' }, { label: 'Narrow row: a Select with the same options', className: 'choice-fit-demo__narrow' }];

const ChoiceFitDemo = (props: { compact?: boolean }) => {
  const [mode, setMode] = useState('auto');
  return (
    <Box className="story-column">
      {WIDTHS.map((width) => (
        <Box key={width.className} className={`choice-fit-demo ${width.className}`}>
          <Text className="story-label">{width.label}</Text>
          <SettingsSection>
            <SettingsRow
              id="release-mode"
              title="Release mode"
              description="When the items of a finished player go out."
              hint="Players can change it in a running session."
              compact={props.compact}
              input={{ kind: 'segmented', value: mode, onChange: setMode, options: RELEASE_OPTIONS }}
            />
          </SettingsSection>
        </Box>
      ))}
    </Box>
  );
};

export { ChoiceFitDemo };
