/* @layer stories @kind story */
import { useState } from 'react';
import { SettingsSection } from '../../../src/composites';
import type { SettingsItem } from '../../../src/composites';
import { Box } from '../../../src/primitives';

const FIXED = { on: 'The game uses the fixed behaviour.', off: 'It keeps the original bug.' };

const RestHintsDemo = () => {
  const [s, setS] = useState({ clip: true, bottle: false, sword: true, plain: false });
  const toggle = (key: keyof typeof s, atRest: boolean): SettingsItem['input'] => ({
    kind: 'toggle', value: s[key], onChange: (value) => setS({ ...s, [key]: value }), hints: { ...FIXED, atRest },
  });
  const fixes: SettingsItem[] = [
    { id: 'clip', title: 'Ledge clip', description: 'Link can no longer walk through the corner of a raised ledge.', hint: 'Speedruns rely on it.', input: toggle('clip', true) },
    { id: 'bottle', title: 'Bottle swap', description: 'A swung bottle no longer catches an item it should not.', hint: 'Applies on the next swing.', input: toggle('bottle', true) },
    { id: 'sword', title: 'Sword reset', noDescription: true, hint: 'The sword stays drawn after a ledge grab.', input: toggle('sword', true) },
  ];
  const plain: SettingsItem[] = [
    { id: 'plain', title: 'Ledge clip', description: 'The default: point at the toggle to read On and Off.', hint: 'Speedruns rely on it.', input: toggle('plain', false) },
  ];
  return (
    <Box className="story-column">
      <SettingsSection id="rest-hints" title="Bug fixes, hints at rest" rows={fixes} />
      <SettingsSection id="pointed-hints" title="Bug fix, hints while pointing" rows={plain} />
    </Box>
  );
};

export { RestHintsDemo };
