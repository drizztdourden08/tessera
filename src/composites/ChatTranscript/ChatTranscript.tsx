/* @layer renderer-components @kind component */
import { EmptyState } from '../../primitives/EmptyState';
import { Flex } from '../../primitives/Flex';
import { ScrollArea } from '../../primitives/ScrollArea';
import { chatRows } from './behavior/chat-rows';
import type { ChatTranscriptProps } from './ChatTranscript.type';
import { ChatRow } from './sub-components/ChatRow';
import './ChatTranscript.css';

const ChatTranscript = (props: ChatTranscriptProps) => {
  const { messages, follow = true, empty, className } = props;
  if (messages.length === 0 && empty != null) return <EmptyState message={empty} className={className} />;
  return (
    <ScrollArea follow={follow} scrollbar="slim" className={['chat-transcript', className].filter(Boolean).join(' ')}>
      <Flex direction="column" gap="md" className="chat-transcript__rows">
        {chatRows(messages).map((row) => <ChatRow key={row.id} row={row} />)}
      </Flex>
    </ScrollArea>
  );
};

export { ChatTranscript };
