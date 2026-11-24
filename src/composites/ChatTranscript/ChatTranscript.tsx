/* @layer renderer-components @kind component */
import { useMemo, useRef } from 'react';
import { EmptyState } from '../../primitives/EmptyState';
import { Flex } from '../../primitives/Flex';
import { ScrollArea } from '../../primitives/ScrollArea';
import { chatRows } from './behavior/chat-rows';
import { useFreshRows } from './behavior/useFreshRows';
import { useWindowedRows } from './behavior/useWindowedRows';
import type { ChatTranscriptProps } from './ChatTranscript.type';
import { ChatRow } from './sub-components/ChatRow';
import './ChatTranscript.css';

const ChatTranscript = (props: ChatTranscriptProps) => {
  const { messages, follow = true, empty, className } = props;
  const areaRef = useRef<HTMLDivElement | null>(null);
  const rows = useMemo(() => chatRows(messages), [messages]);
  const { visible, onScroll } = useWindowedRows(rows, areaRef);
  const fresh = useFreshRows(rows);
  if (messages.length === 0 && empty != null) return <EmptyState message={empty} className={className} />;
  return (
    <ScrollArea ref={areaRef} follow={follow} onScroll={onScroll} scrollbar="slim" className={['chat-transcript', className].filter(Boolean).join(' ')}>
      <Flex direction="column" gap="md" className="chat-transcript__rows">
        {visible.map((row) => <ChatRow key={row.id} row={row} fresh={fresh.has(row.id)} />)}
      </Flex>
    </ScrollArea>
  );
};

export { ChatTranscript };
