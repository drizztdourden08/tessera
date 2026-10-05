/* @layer stories @kind component */
import { useState } from 'react';
import { DropdownMenu } from '../../../src/composites';
import type { MenuGroup } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';

const layoutMenu = (say: (text: string) => void): MenuGroup[] => [{
  id: 'layout',
  label: 'Layout',
  items: [
    { id: 'save', icon: 'save', label: 'Save layout', onSelect: () => say('Layout saved.') },
    { separator: true },
    { id: 'reset', icon: 'rotate-ccw', label: 'Reset layout', kind: 'confirm', onSelect: () => say('Layout reset.') },
    { id: 'forget', icon: 'trash-2', label: 'Forget saved layouts', kind: 'confirm', confirm: 'Click again to forget all 4', onSelect: () => say('Saved layouts forgotten.') },
  ],
}];

const MenuConfirmDemo = ({ inline = false }: { inline?: boolean }) => {
  const [said, setSaid] = useState('Nothing run yet.');
  const groups = layoutMenu(setSaid);
  return (
    <Box className="story-column">
      {inline ? <DropdownMenu inline groups={groups} /> : <DropdownMenu trigger={{ label: 'Layout', icon: 'layout-grid' }} groups={groups} />}
      <Text className="story-label">{said}</Text>
    </Box>
  );
};

export { MenuConfirmDemo };
