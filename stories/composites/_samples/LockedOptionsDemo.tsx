/* @layer stories @kind story */
import { useState } from 'react';
import { SettingsSection } from '../../../src/composites';
import type { SettingsItem } from '../../../src/composites';
import { Box } from '../../../src/primitives';

const NO_FULLSCREEN = 'This display does not offer fullscreen on this computer.';

const useLocked = () => {
  const [s, setS] = useState({ rate: '60', mode: 'windowed', sync: 'off', overlays: ['fps'] as readonly string[] });
  return { s, set: (patch: Partial<typeof s>) => setS({ ...s, ...patch }) };
};

const LockedOptionsDemo = (props: { compact?: boolean }) => {
  const { s, set } = useLocked();
  const rows: SettingsItem[] = [
    {
      id: 'rate', title: 'Target refresh rate', description: 'The rate the synced mode uses.', hint: 'Pick a rate the display offers.',
      input: {
        kind: 'segmented', value: s.rate, onChange: (v) => set({ rate: v }),
        options: [
          { value: '60', label: '60 Hz' },
          { value: '120', label: '120 Hz' },
          { value: '144', label: '144 Hz', disabled: 'This display tops out at 120 Hz.' },
        ],
      },
    },
    {
      id: 'mode', title: 'Window mode', description: 'How the window takes the screen.', hint: 'Applies at once.',
      input: {
        kind: 'select', value: s.mode, onChange: (v) => set({ mode: v }),
        options: [
          { value: 'windowed', label: 'Windowed' },
          { value: 'borderless', label: 'Borderless' },
          { value: 'fullscreen', label: 'Fullscreen', disabled: NO_FULLSCREEN },
        ],
      },
    },
    {
      id: 'sync', title: 'Frame sync', description: 'How frames wait for the display.', hint: 'Off draws as fast as it can.',
      input: {
        kind: 'radio', value: s.sync, onChange: (v) => set({ sync: v }),
        options: [
          { value: 'off', label: 'Off', hint: 'Every frame draws at once.' },
          { value: 'vsync', label: 'Vertical sync', hint: 'Frames wait for the display.' },
          { value: 'adaptive', label: 'Adaptive', hint: 'The display waits for frames.', disabled: 'Needs a display with a variable rate.' },
        ],
      },
    },
    {
      id: 'overlays', title: 'Overlays', description: 'What draws over the picture.', hint: 'Pick any.',
      input: {
        kind: 'multi', value: s.overlays, onChange: (v) => set({ overlays: v }),
        options: [
          { value: 'fps', label: 'Frame rate' },
          { value: 'temp', label: 'Temperature', disabled: 'No sensor answered on this computer.' },
          { value: 'clock', label: 'Clock' },
        ],
      },
    },
  ];
  return (
    <Box className="story-column">
      <SettingsSection id="locked-options" title="Display" rows={rows} compact={props.compact} />
    </Box>
  );
};

export { LockedOptionsDemo };
