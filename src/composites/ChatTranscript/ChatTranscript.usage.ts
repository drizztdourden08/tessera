/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A scrolling chat transcript: messages grouped in rows by speaker, with the tool calls of each message folded away.',
  useWhen: [
    'A conversation with a person or an agent shows its messages in order, and new ones arrive while it is open.',
    'A message ran tools, and the reader only needs the count until they open it.',
  ],
  avoidWhen: [
    { case: 'The lines are log output with search, filters and selection.', use: 'LogPanel' },
    { case: 'The list is a fixed set of records, not a conversation.', use: 'ItemList' },
  ],
  rules: [
    'Pass messages in order. Each has an id, a speaker and optional role, time, content and tools.',
    'Consecutive messages from the same speaker form one row. The name and time show once at the top of the row.',
    'role tints the speaker name: user, assistant or system. It defaults to assistant.',
    'The tools of a message fold into one line that reads, for example, 3 tool calls. It shows a running state while any tool runs and a failed state when one failed.',
    'Open, each tool shows its name, summary and status. A tool with detail folds that detail under its own line.',
    'The transcript scrolls and follows the end as messages arrive, until the reader scrolls up. Set follow to false to turn that off.',
    'Give the transcript a height, through a class or its parent. empty shows in place of the list when there are no messages.',
  ],
  a11y: [
    'Folds are native details elements, so Enter and Space open them.',
    'The list keeps the reading order of the messages.',
  ],
  tree: {
    path: ['data', 'a conversation of messages and tool calls'],
    rule: 'ChatTranscript lists chat messages by speaker, folds their tool calls and stays at the newest message.',
  },
  example: `import { ChatTranscript } from '@drizztdourden08/tessera';

const Chat = () => (
  <ChatTranscript
    messages={[
      { id: '1', speaker: 'You', role: 'user', content: 'Check the build.' },
      {
        id: '2',
        speaker: 'Agent',
        content: 'Running it now.',
        tools: [{ id: 't1', name: 'build', summary: 'all packages', status: 'running' }],
      },
    ]}
    empty="No messages yet."
  />
);
`,
  propsHash: 'PLACEHOLDER',
} satisfies ComponentUsage;

export { usage };
