/* @layer stories @kind component */
import { useState } from 'react';
import { ChatTranscript } from '../../../src/composites';
import type { ChatTranscriptMessage } from '../../../src/composites';
import { Box } from '../../../src/primitives/Box';
import { Button } from '../../../src/primitives/Button';
import { Flex } from '../../../src/primitives/Flex';
import { CHAT_SAMPLE_HISTORY, CHAT_SAMPLE_MESSAGES, CHAT_SAMPLE_REPLIES } from './ChatTranscriptSamples.constants';
import type { ChatTranscriptDemoProps } from './ChatTranscriptDemo.type';

const initialMessages = (empty: boolean, long: boolean): ChatTranscriptMessage[] => {
  if (empty) return [];
  return long ? CHAT_SAMPLE_HISTORY : CHAT_SAMPLE_MESSAGES;
};

const ChatTranscriptDemo = ({ follow = true, empty = false, long = false }: ChatTranscriptDemoProps) => {
  const [messages, setMessages] = useState<ChatTranscriptMessage[]>(() => initialMessages(empty, long));
  const add = (): void => {
    const next = messages.length + 1;
    const reply = CHAT_SAMPLE_REPLIES[next % CHAT_SAMPLE_REPLIES.length];
    setMessages([...messages, { id: `m${next}`, speaker: 'Overlord', content: reply }]);
  };
  return (
    <Flex direction="column" gap="sm" className="chat-transcript-story">
      <Box className="chat-transcript-story__frame">
        <ChatTranscript messages={messages} follow={follow} empty="No messages yet." />
      </Box>
      <Button variant="secondary" onClick={add}>Add a message</Button>
    </Flex>
  );
};

export { ChatTranscriptDemo };
