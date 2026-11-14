/* @layer renderer-components @kind logic */
import type { ChatTranscriptTool } from '../ChatTranscript.type';

const chatToolsLabel = (tools: readonly ChatTranscriptTool[]): string => `${tools.length} tool ${tools.length === 1 ? 'call' : 'calls'}`;

export { chatToolsLabel };
