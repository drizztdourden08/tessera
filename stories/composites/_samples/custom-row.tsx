/* @layer stories @kind data */
import type { SettingsItem } from '../../../src/composites';
import { Button, Icon } from '../../../src/primitives';

const CUSTOM_ROW: SettingsItem = {
  id: 'data-folder',
  title: 'Data folder',
  description: 'A custom control: anything the host draws.',
  input: {
    kind: 'custom',
    control: <Button size="sm" variant="secondary" icon={<Icon name="folder-open" />}>Open folder</Button>,
    text: '~/Saves/mira',
  },
};

export { CUSTOM_ROW };
