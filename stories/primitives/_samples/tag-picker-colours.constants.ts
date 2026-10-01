/* @layer stories @kind data */
import type { TagPickerGroup } from '../../../src/primitives';

const TAG_PICKER_COLOURS: Readonly<Record<'default' | 'category' | 'urgency', { initial: string[]; groups: TagPickerGroup[] }>> = {
  default: {
    initial: ['ganon'],
    groups: [{
      id: 'goals',
      options: [
        { value: 'ganon', label: 'Defeat Ganon' },
        { value: 'triforce', label: 'Triforce hunt' },
        { value: 'pedestal', label: 'Pedestal' },
      ],
    }],
  },
  category: {
    initial: ['zelda', 'metroid', 'pokemon'],
    groups: [{
      id: 'series',
      options: [
        { value: 'zelda', label: 'Zelda', variant: 'category', color: 'green' },
        { value: 'metroid', label: 'Metroid', variant: 'category', color: 'violet' },
        { value: 'pokemon', label: 'Pokemon', variant: 'category', color: 'rose' },
        { value: 'mario', label: 'Mario', variant: 'category', color: 'orange' },
        { value: 'kirby', label: 'Kirby', variant: 'category', color: 'pink' },
      ],
    }],
  },
  urgency: {
    initial: ['stable', 'broken'],
    groups: [{
      id: 'state',
      options: [
        { value: 'stable', label: 'Stable', variant: 'urgency', color: 'success' },
        { value: 'beta', label: 'Beta', variant: 'urgency', color: 'warning' },
        { value: 'broken', label: 'Broken', variant: 'urgency', color: 'danger' },
        { value: 'new', label: 'New', variant: 'urgency', color: 'info' },
      ],
    }],
  },
};

export { TAG_PICKER_COLOURS };
