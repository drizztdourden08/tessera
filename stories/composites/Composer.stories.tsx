/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ComposerDemo } from './_samples/ComposerDemo';
import './Composer.stories.css';

type ComposerArgs = {
  maxRows: number;
  disabled: boolean;
};

const ARGS: Partial<ComposerArgs> = { maxRows: 8, disabled: false };

const ARG_TYPES: PlaygroundArgTypes<ComposerArgs> = {
  maxRows: { group: 'Layout', control: 'number', description: 'The box grows to this many lines, then the text scrolls.' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Inputs/Composer',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ComposerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: ({ maxRows = 8, disabled = false }) => <ComposerDemo maxRows={maxRows} disabled={disabled} />,
} satisfies PlaygroundStory<ComposerArgs>;

const WithBar = {
  name: 'A bottom bar on the left of the send button',
  render: () => <ComposerDemo withBar />,
} satisfies StoryLiteStoryDefinition<ComposerArgs>;

const ThreeRows = {
  name: 'Three rows at most, then it scrolls',
  render: () => <ComposerDemo maxRows={3} />,
} satisfies StoryLiteStoryDefinition<ComposerArgs>;

const CODE = `import { useState } from 'react';
import { Composer } from '@drizztdourden08/tessera';

const [text, setText] = useState('');

<Composer value={text} onChange={setText} onSubmit={send} placeholder="Ask anything" />
<Composer value={text} onChange={setText} onSubmit={send} maxRows={4} bar={<Button size="sm">Attach</Button>} />
<Composer value={text} onChange={setText} onSubmit={send} sendSlot={<IconButton label="Stop">...</IconButton>} />`;

const Overview = overviewStory({
  component: 'Composer',
  description: 'A chat box: one rounded box with a text area that grows with the text, a bar on the left and a send button on the right.',
  points: [
    'The text is controlled with `value` and `onChange`; Enter calls `onSubmit`, Shift+Enter adds a line.',
    '`maxRows` caps the growth; past it the text scrolls.',
    '`bar` fills the left of the bottom row; `sendSlot` replaces the default send button.',
    'The box shows the focus ring, not the text area.',
  ],
  instead: '[MarkdownEditor] when the text needs a toolbar and a preview, or [Textarea] for a plain field in a form.',
  playground: Playground,
  variants: [WithBar, ThreeRows],
  code: CODE,
});

export default meta;
export { Overview, Playground, ThreeRows, WithBar };
