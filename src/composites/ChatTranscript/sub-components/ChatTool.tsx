/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Disclosure } from '../../../primitives/Disclosure';
import { ChatToolLine } from './ChatToolLine';
import type { ChatToolLineProps } from './ChatToolLine.type';

const ChatTool = ({ tool }: ChatToolLineProps) => {
  if (tool.detail == null) return <ChatToolLine tool={tool} />;
  return (
    <Disclosure size="sm" summary={<ChatToolLine tool={tool} />}>
      <Box className="chat-transcript__detail">{tool.detail}</Box>
    </Disclosure>
  );
};

export { ChatTool };
