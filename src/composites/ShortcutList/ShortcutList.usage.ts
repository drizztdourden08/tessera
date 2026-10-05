/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A list of keys, clicks and drags and what each one does, with the keys in one column and the descriptions in the next.',
  useWhen: [
    'A panel, a menu or a help screen lists the keys and gestures a tool answers to.',
    'Some shortcuts only work at certain moments, such as while dragging, and read better under a heading of their own.',
  ],
  avoidWhen: [
    { case: 'One key or one combination sits inside a sentence, a button or a menu item.', use: 'Shortcut' },
    { case: 'The keys should be shown on a drawn keyboard, pressed in turn.', use: 'ShortcutTour' },
  ],
  rules: [
    'Lead each description with what happens, in a short phrase; keep the key cell to keys or one gesture.',
    'Write a gesture as an icon and a short verb, such as Drag title or Drag gap, never as a sentence.',
    'Group rows by when they work, with a short heading such as Any time or While dragging, and drop words the heading already says.',
    'Use size xs in menus, panels and cards, and md on a page of its own.',
  ],
  a11y: [
    'Each group is a description list: the keys are the term and the description its definition, so a screen reader reads them in pairs.',
    'Keycaps read their full key names, and a gesture reads its label.',
    'Pass label to name the whole list, and a group label names its group.',
  ],
  tree: {
    path: ['a status, a count or a label', 'a list of keys and what they do'],
    rule: 'ShortcutList keeps every key in one column and every description at one edge, however long the text runs.',
  },
  example: `import { ShortcutList } from '@drizztdourden08/tessera';

const DockShortcuts = () => (
  <ShortcutList
    label="Dock shortcuts"
    groups={[
      {
        label: 'Any time',
        items: [
          { gesture: { icon: 'move', label: 'Drag title' }, description: 'Move to a dock edge, a pane, a tab or over the main view' },
          { keys: 'alt', description: 'Peek: widgets fold away while held' },
        ],
      },
      {
        label: 'While dragging',
        items: [
          { keys: 'shift', description: 'Swap with the pane under the pointer' },
          { keys: 'esc', description: 'Cancel the drag' },
        ],
      },
    ]}
  />
);
`,
  propsHash: '67fe9c40daba7312',
} satisfies ComponentUsage;

export { usage };
