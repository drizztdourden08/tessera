/* @layer stories @kind story */
import { useState } from 'react';
import { SettingsSection } from '../../../src/composites';
import type { SettingsItem } from '../../../src/composites';
import { Box } from '../../../src/primitives';

const OptionalHintDemo = () => {
  const [s, setS] = useState({ withHint: true, withoutHint: true });
  const toggle = (key: keyof typeof s): SettingsItem['input'] => ({ kind: 'toggle', value: s[key], onChange: (value) => setS({ ...s, [key]: value }) });
  const rows: SettingsItem[] = [
    { id: 'with-hint', title: 'Launch at startup', description: 'Opens the app when you sign in.', hint: 'Takes effect at the next sign in.', input: toggle('withHint') },
    { id: 'without-hint', title: 'Show the tray icon', description: 'Keeps an icon near the clock.', input: toggle('withoutHint') },
  ];
  return (
    <Box className="story-column">
      <SettingsSection id="optional-hint" title="Hint and no hint" rows={rows} />
    </Box>
  );
};

export { OptionalHintDemo };
