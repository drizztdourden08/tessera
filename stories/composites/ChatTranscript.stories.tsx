/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ChatTranscriptDemo } from './_samples/ChatTranscriptDemo';
import './ChatTranscript.stories.css';

type ChatTranscriptArgs = {
  follow: boolean;
};

const ARGS: Partial<ChatTranscriptArgs> = { follow: true };

const ARG_TYPES: PlaygroundArgTypes<ChatTranscriptArgs> = {
  follow: { group: 'Behaviour', control: 'boolean', description: 'Stays at the newest message while the reader is at the end. Press Add a message to see it.' },
};

const meta = {
  title: 'Composites · Content/ChatTranscript',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ChatTranscriptArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ChatTranscriptDemo follow={args.follow} />,
} satisfies PlaygroundStory<ChatTranscriptArgs>;

const Following = {
  name: 'Following: add messages and the list stays at the end',
  render: () => <ChatTranscriptDemo />,
} satisfies StoryLiteStoryDefinition<ChatTranscriptArgs>;

const NotFollowing = {
  name: 'Not following: the list stays where it is',
  render: () => <ChatTranscriptDemo follow={false} />,
} satisfies StoryLiteStoryDefinition<ChatTranscriptArgs>;

const Empty = {
  name: 'Empty: a message in place of the list',
  render: () => <ChatTranscriptDemo empty />,
} satisfies StoryLiteStoryDefinition<ChatTranscriptArgs>;

const Long = {
  name: 'Long history: earlier rows load near the top',
  render: () => <ChatTranscriptDemo long />,
} satisfies StoryLiteStoryDefinition<ChatTranscriptArgs>;

const CODE = `import { ChatTranscript } from '@drizztdourden08/tessera';

<ChatTranscript
  messages={[
    { id: '1', speaker: 'You', role: 'user', content: 'Check the build.' },
    { id: '2', speaker: 'Agent', content: 'Running it now.', tools: [{ id: 't1', name: 'build', status: 'running' }] },
  ]}
  empty="No messages yet."
/>`;

const Overview = overviewStory({
  component: 'ChatTranscript',
  description: 'A scrolling chat transcript, grouped by speaker, with the tool calls of each message folded.',
  points: [
    'Consecutive messages from one speaker share a row; the name and time show once.',
    '`role` tints the speaker name: `user`, `assistant` or `system`.',
    'The tools of a message fold into a line such as 3 tool calls, with a running state while one runs.',
    'A tool with `detail` folds that detail under its own line.',
    'A user row sits on the inline end in a bubble, with its time under it.',
    'Only the last rows render; scroll near the top and earlier rows load while the position holds. New rows slide up.',
    'It follows the newest message until the reader scrolls up; `follow` turns that off.',
  ],
  instead: '[LogPanel] for log lines with search and filters.',
  playground: Playground,
  variants: [Following, NotFollowing, Empty, Long],
  code: CODE,
});

export default meta;
export { Empty, Following, Long, NotFollowing, Overview, Playground };
