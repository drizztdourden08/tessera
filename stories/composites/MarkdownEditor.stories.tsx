/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import type { MarkdownEditorLayout } from '../../src/composites';
import { overviewStory } from '../_template/overview-story';
import { LONG_NOTE, RELEASE_NOTE } from './_samples/markdown-notes.constants';
import { MarkdownEditorDemo } from './_samples/MarkdownEditorDemo';
import { MarkdownListKeysDemo } from './_samples/MarkdownListKeysDemo';
import './MarkdownEditor.stories.css';

type MarkdownEditorArgs = {
  layout: MarkdownEditorLayout | 'auto';
  compact: boolean;
  disabled: boolean;
};

const ARGS: Partial<MarkdownEditorArgs> = { layout: 'auto', compact: false, disabled: false };

const ARG_TYPES: PlaygroundArgTypes<MarkdownEditorArgs> = {
  layout: { group: 'Appearance', control: 'select', options: ['auto', 'split', 'tabs'], description: 'auto is split when the container is wide, tabs when it is narrow.' },
  compact: { group: 'Appearance', control: 'boolean', description: 'A slim toolbar and a 3 row box that grows; the preview opens from a toggle.' },
  disabled: { group: 'State', control: 'boolean', description: 'Turns the field and the toolbar off.' },
};

const meta = {
  title: 'Composites · Inputs/MarkdownEditor',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<MarkdownEditorArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: ({ layout = 'auto', compact = false, disabled = false }) => (
    <MarkdownEditorDemo initial={RELEASE_NOTE} layout={layout === 'auto' ? undefined : layout} compact={compact} disabled={disabled} />
  ),
} satisfies PlaygroundStory<MarkdownEditorArgs>;

const Split = {
  name: 'Split layout',
  render: () => <MarkdownEditorDemo initial={RELEASE_NOTE} layout="split" />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const Tabs = {
  name: 'Tabs layout',
  render: () => <MarkdownEditorDemo initial={RELEASE_NOTE} layout="tabs" />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const Compact = {
  name: 'Compact: a slim toolbar and a 3 row box that grows, the preview behind a toggle',
  render: () => <MarkdownEditorDemo initial={'A short note for a card.'} compact />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const WriteOnly = {
  name: 'Write only: preview false hides the eye, the tabs and the preview',
  render: () => <MarkdownEditorDemo initial={'A note with no preview.'} compact preview={false} decide />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const LongDocument = {
  name: 'A long document',
  render: () => <MarkdownEditorDemo initial={LONG_NOTE} layout="split" rows={20} />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const Limited = {
  name: 'A 120 character limit, with the counter in the last 10 percent',
  render: () => <MarkdownEditorDemo initial={'A short note that is close to the limit of the field, so the counter shows at once.'} layout="tabs" rows={4} maxLength={120} />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const Keys = {
  name: 'Mod+Enter sends the text and Escape cancels',
  render: () => <MarkdownEditorDemo initial="" layout="tabs" rows={4} keys />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const ListKeys = {
  name: 'Enter continues a list, Tab indents it',
  render: () => <MarkdownListKeysDemo />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const ToolbarEnd = {
  name: 'A toolbar end slot: a Decide button at the right end of the toolbar',
  render: () => <MarkdownEditorDemo initial="" layout="tabs" rows={4} decide />,
} satisfies StoryLiteStoryDefinition<MarkdownEditorArgs>;

const CODE = `import { useState } from 'react';
import { MarkdownEditor } from '@drizztdourden08/tessera';

const [note, setNote] = useState('');

<MarkdownEditor label="Note" value={note} onChange={setNote} />
<MarkdownEditor value={note} onChange={setNote} layout="tabs" onLink={openInBrowser} />
<MarkdownEditor value={note} onChange={setNote} compact />
<MarkdownEditor value={note} onChange={setNote} preview={false} />
<MarkdownEditor value={note} onChange={setNote} toolbarEnd={<Button size="sm">Decide</Button>} />
<MarkdownEditor value={note} onChange={setNote} maxLength={500} onSubmit={send} onEscape={close} />`;

const Overview = overviewStory({
  component: 'MarkdownEditor',
  description: 'A field for writing Markdown, with a formatting toolbar and a live preview drawn by Markdown.',
  points: [
    'The text is controlled with `value` and `onChange`, like any other field, with `label`, `hint` and `error`.',
    'The toolbar wraps the selection or prefixes its lines, and pressing a button again removes the mark.',
    'Mod+B, Mod+I and Mod+K work in the field; Enter, Tab and Backspace carry a list on; Undo keeps working.',
    '`onSubmit` takes Mod+Enter, `onEscape` takes Escape, and `maxLength` shows a counter near the limit.',
    '`layout` is split or tabs, `onLink` takes preview link clicks, `toolbarEnd` adds a node at the toolbar end.',
    '`compact` is a slim toolbar and a 3 row box that grows; `preview={false}` drops the preview for write only.',
  ],
  instead: '[Textarea] for plain text, or [Markdown] to only show a Markdown text.',
  playground: Playground,
  variants: [Split, Tabs, Compact, WriteOnly, ToolbarEnd, LongDocument, Limited, Keys, ListKeys],
  code: CODE,
});

export default meta;
export { Compact, Keys, Limited, ListKeys, LongDocument, Overview, Playground, Split, Tabs, ToolbarEnd, WriteOnly };
