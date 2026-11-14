/* @layer renderer-components @kind component */
import { Disclosure } from '../../../primitives/Disclosure';
import { Flex } from '../../../primitives/Flex';
import { Status } from '../../../primitives/Status';
import { Text } from '../../../primitives/Text';
import { chatToolsLabel } from '../behavior/chat-tools-label';
import { chatToolsState } from '../behavior/chat-tools-state';
import { CHAT_TOOL_STATUSES } from '../ChatTranscript.constants';
import type { ChatMessageToolsProps } from './ChatMessageTools.type';
import { ChatTool } from './ChatTool';

const ChatMessageTools = ({ tools }: ChatMessageToolsProps) => {
  const state = chatToolsState(tools);
  return (
    <Disclosure
      size="sm"
      summary={<Text variant="caption" tone="muted">{chatToolsLabel(tools)}</Text>}
      end={state && <Status map={CHAT_TOOL_STATUSES} value={state} size="sm" dot />}
    >
      <Flex direction="column" gap="xs" className="chat-transcript__tools">
        {tools.map((tool) => <ChatTool key={tool.id} tool={tool} />)}
      </Flex>
    </Disclosure>
  );
};

export { ChatMessageTools };
