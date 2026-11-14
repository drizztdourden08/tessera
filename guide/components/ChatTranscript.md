# ChatTranscript

A scrolling chat transcript: messages grouped in rows by speaker, with the tool calls of each message folded away.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { ChatTranscript } from '@drizztdourden08/tessera';
```

The source is `src/composites/ChatTranscript/ChatTranscript.tsx`. Its gallery page is Composites · Content/ChatTranscript (`#/story/composites-chattranscript--overview`).

## Where the questions lead here

What are you placing? Data. What data are you showing? A conversation of messages and tool calls.

ChatTranscript lists chat messages by speaker, folds their tool calls and stays at the newest message.

## Use it when

- A conversation with a person or an agent shows its messages in order, and new ones arrive while it is open.
- A message ran tools, and the reader only needs the count until they open it.

## Use something else when

- The lines are log output with search, filters and selection. Use [LogPanel](LogPanel.md) instead.
- The list is a fixed set of records, not a conversation. Use [ItemList](ItemList.md) instead.

## Rules

- Pass messages in order. Each has an id, a speaker and optional role, time, content and tools.
- Consecutive messages from the same speaker form one row. The name and time show once at the top of the row.
- Role tints the speaker name: user, assistant or system. It defaults to assistant.
- The tools of a message fold into one line that reads, for example, 3 tool calls. It shows a running state while any tool runs and a failed state when one failed.
- Open, each tool shows its name, summary and status. A tool with detail folds that detail under its own line.
- The transcript scrolls and follows the end as messages arrive, until the reader scrolls up. Set follow to false to turn that off.
- Give the transcript a height, through a class or its parent. empty shows in place of the list when there are no messages.

## Accessibility

- Folds are native details elements, so Enter and Space open them.
- The list keeps the reading order of the messages.

## Example

```tsx
import { ChatTranscript } from '@drizztdourden08/tessera';

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
```

## Props

- `messages`: `ChatTranscriptMessage[]`.
- `follow` (optional): `boolean`. Default `true`.
- `empty` (optional): `ReactNode`.
- `className` (optional): `string`.

## Tokens

It draws on `--border-width-thick`, `--c-border`, `--space-md`, `--space-sm`.
