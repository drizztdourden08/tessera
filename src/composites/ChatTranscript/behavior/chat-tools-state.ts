/* @layer renderer-components @kind logic */
import type { ChatToolStatus, ChatTranscriptTool } from '../ChatTranscript.type';

const chatToolsState = (tools: readonly ChatTranscriptTool[]): ChatToolStatus | undefined => {
  if (tools.some((tool) => tool.status === 'running')) return 'running';
  if (tools.some((tool) => tool.status === 'failed')) return 'failed';
  return undefined;
};

export { chatToolsState };
