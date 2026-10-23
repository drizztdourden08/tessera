/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'The strip of open documents above an editor: a tab per document with an unsaved mark and a close button, put in order by drag or keys, scrolling when they do not fit.',
  useWhen: [
    'The user has several documents open at once and switches between them, such as the drawings in a pixel art editor.',
    'The user closes a document from its tab, and the app may need to ask first because of unsaved changes.',
    'The user puts the open documents in the order they like.',
  ],
  avoidWhen: [
    { case: 'The tabs are fixed views of one area, with no close and no reorder.', use: 'Tabs' },
    { case: 'The tabs split one long form into groups with counts.', use: 'FormGroupTabs' },
    { case: 'The items are a vertical list the user reorders, with on and off icons.', use: 'ReorderList' },
  ],
  rules: [
    'Keep the tabs and the active id in the app; the strip only draws them and calls onActivate, onClose and onMove.',
    'onClose only asks to close. The app may refuse, for example to confirm unsaved changes first; the tab stays until the app removes it from tabs.',
    'onMove gets the old and the new index; change the order of tabs there.',
    'Set unsaved on a tab to show a dot that turns into the close button on hover or focus.',
    'title is the text on the tab, cut with an ellipsis; tooltip is the hover text and defaults to the title.',
    'When the tabs do not fit, the strip scrolls and keeps the active tab in view. Pass overflowMenu to add a menu that lists every tab.',
    'Show the document of the active tab beside the strip; DocumentTabs draws no panel.',
  ],
  a11y: [
    'The strip is a tablist named by label, and each tab is a button with role tab and aria-selected set on the active one. Only one tab is a tab stop.',
    'Left and Right move focus from tab to tab and wrap, Home and End go to the first and the last. Enter or Space activates the focused tab.',
    'Delete or Ctrl and W asks to close the focused tab. The close button of each tab is named Close and the title, and is not a tab stop.',
    'Alt and Left or Right moves the focused tab. Focus stays on the tab, and the move is announced.',
    'A tab with unsaved changes says so to screen readers. Middle click closes a tab.',
    'The drop line follows the pointer while a tab is dragged, and the strip adds no motion when the user asks for less.',
  ],
  tree: {
    path: ['navigation', 'between the open documents of an editor'],
    rule: 'DocumentTabs is the strip of open documents the user switches, closes and reorders, the same way in every editor.',
  },
  example: `import { DocumentTabs } from '@drizztdourden08/tessera';
import type { DocumentTab } from '@drizztdourden08/tessera';

interface OpenDrawingsProps {
  drawings: DocumentTab[];
  activeId: string;
  open: (id: string) => void;
  askToClose: (id: string) => void;
  move: (from: number, to: number) => void;
}

const OpenDrawings = ({ drawings, activeId, open, askToClose, move }: OpenDrawingsProps) => (
  <DocumentTabs
    label="Open drawings"
    tabs={drawings}
    activeId={activeId}
    onActivate={open}
    onClose={askToClose}
    onMove={move}
    overflowMenu
  />
);
`,
  propsHash: '82b0f142b383f064',
} satisfies ComponentUsage;

export { usage };
