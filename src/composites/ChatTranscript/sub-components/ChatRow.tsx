/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { CHAT_ROLE_TONES } from '../ChatTranscript.constants';
import { ChatMessageTools } from './ChatMessageTools';
import type { ChatRowProps } from './ChatRow.type';

const ChatRow = ({ row, fresh = false }: ChatRowProps) => {
  const mine = row.role === 'user';
  return (
    <Flex direction="column" gap="xs" className="chat-transcript__row" data-role={row.role} data-fresh={fresh ? 'true' : undefined}>
      {!mine && (
        <Flex align="baseline" gap="sm">
          <Text variant="label" tone={CHAT_ROLE_TONES[row.role]}>{row.speaker}</Text>
          {row.time != null && <Text variant="caption" tone="muted">{row.time}</Text>}
        </Flex>
      )}
      {row.messages.map((message) => (
        <Flex key={message.id} direction="column" gap="xs" className="chat-transcript__message">
          {message.content != null && <Box className="chat-transcript__content">{message.content}</Box>}
          {message.tools && message.tools.length > 0 && <ChatMessageTools tools={message.tools} />}
        </Flex>
      ))}
      {mine && row.time != null && <Text variant="caption" tone="muted" className="chat-transcript__time">{row.time}</Text>}
    </Flex>
  );
};

export { ChatRow };
