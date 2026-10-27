/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { DocumentTabsDemo } from './_samples/DocumentTabsDemo';
import { DocumentTabsMenuDemo } from './_samples/DocumentTabsMenuDemo';
import { DOCUMENT_TABS_ARG_TYPES, DOCUMENT_TABS_ARGS, DOCUMENT_TABS_CODE } from './_samples/document-tabs-story.constants';
import type { DocumentSet, DocumentTabsArgs } from './_samples/document-tabs-story.type';
import './DocumentTabs.stories.css';

const meta = {
  title: 'Composites · Navigation/DocumentTabs',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DocumentTabsArgs>;

const Playground = {
  name: 'Playground',
  args: DOCUMENT_TABS_ARGS,
  argTypes: DOCUMENT_TABS_ARG_TYPES,
  render: (args) => <DocumentTabsDemo key={`${args.documents}-${String(args.menu)}-${args.look}`} documents={args.documents} menu={args.menu} look={args.look} />,
} satisfies PlaygroundStory<DocumentTabsArgs>;

const ThreeDocuments = {
  name: 'Three documents, one with unsaved changes: its dot stays beside the close button on hover',
  render: () => <DocumentTabsDemo />,
} satisfies StoryLiteStoryDefinition<DocumentTabsArgs>;

const ManyTabs = {
  name: 'Twenty four documents in a narrow strip: it scrolls, keeps the active tab in view and has the menu',
  render: () => <DocumentTabsDemo documents="many" menu narrow />,
} satisfies StoryLiteStoryDefinition<DocumentTabsArgs>;

const Raised = {
  name: 'Raised look: tabs with a surface fill and a lifted selected tab, tinted by --document-tab-bg and --document-tab-bg-selected',
  render: () => <DocumentTabsDemo look="raised" />,
} satisfies StoryLiteStoryDefinition<DocumentTabsArgs>;

const Reorder = {
  name: 'Reorder: drag a tab, or press Alt and Left or Right on it',
  render: () => <DocumentTabsDemo showOrder />,
} satisfies StoryLiteStoryDefinition<DocumentTabsArgs>;

const MenuAndAdd = {
  name: 'Menu hook and add button: right click, Menu or Shift+F10 on a tab, and + after the last tab',
  render: () => <DocumentTabsMenuDemo />,
} satisfies StoryLiteStoryDefinition<DocumentTabsArgs>;

const STATE_SETS: readonly { name: string; documents: DocumentSet }[] = [
  { name: 'three', documents: 'three' },
  { name: 'many', documents: 'many' },
  { name: 'unsaved', documents: 'unsaved' },
  { name: 'none', documents: 'none' },
];

const Overview = overviewStory({
  component: 'DocumentTabs',
  description: 'The strip of open documents above an editor: unsaved mark, close, reorder by drag or keys, and scroll when many.',
  points: [
    'The app keeps `tabs` and `activeId`; the strip calls `onActivate`, `onMove` and `onClose`, which only asks.',
    'An unsaved tab keeps its dot beside the close button on hover and focus. Middle click closes.',
    'Drag a tab, or press [[Alt+Left]] or [[Alt+Right]]. [[Delete]] or [[Ctrl+W]] closes the focused tab.',
    'Too many tabs scroll with the active one in view; `overflowMenu` adds a menu that lists them all.',
    '`look="raised"` fills the tabs and lifts the selected one; `--document-tab-bg` sets the fill.',
    '`onTabContextMenu` gets the tab id on right click or [[Menu]]; `onAdd` draws a + button.',
  ],
  instead: '[Tabs] for fixed views of one area, or [RowGrid] for a short list of rows the user edits and puts in order.',
  playground: Playground,
  variants: [ThreeDocuments, ManyTabs, Raised, Reorder, MenuAndAdd],
  states: {
    render: (props: StateProps) => <DocumentTabsDemo documents={(props.documents as DocumentSet | undefined) ?? 'three'} />,
    list: STATE_SETS.map(({ name, documents }) => ({ name, props: { documents } })),
  },
  code: DOCUMENT_TABS_CODE,
});

export default meta;
export { ManyTabs, MenuAndAdd, Overview, Playground, Raised, Reorder, ThreeDocuments };
