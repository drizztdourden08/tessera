/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Status } from '../../../primitives/Status';
import { Text } from '../../../primitives/Text';
import { CHAT_TOOL_STATUSES } from '../ChatTranscript.constants';
import type { ChatToolLineProps } from './ChatToolLine.type';

const ChatToolLine = ({ tool }: ChatToolLineProps) => (
  <Flex align="center" gap="sm" className="chat-transcript__tool">
    <Text variant="caption" mono>{tool.name}</Text>
    {tool.summary != null && <Text variant="caption" tone="muted" className="chat-transcript__tool-summary">{tool.summary}</Text>}
    {tool.status && <Status map={CHAT_TOOL_STATUSES} value={tool.status} size="sm" dot />}
  </Flex>
);

export { ChatToolLine };
