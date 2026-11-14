/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ChatTranscriptRole = 'user' | 'assistant' | 'system';

type ChatToolStatus = 'running' | 'done' | 'failed';

interface ChatTranscriptTool {
  id: string;
  name: string;
  summary?: ReactNode;
  detail?: ReactNode;
  status?: ChatToolStatus;
}

interface ChatTranscriptMessage {
  id: string;
  speaker: string;
  role?: ChatTranscriptRole;
  time?: ReactNode;
  content?: ReactNode;
  tools?: ChatTranscriptTool[];
}

interface ChatTranscriptProps {
  messages: ChatTranscriptMessage[];
  follow?: boolean;
  empty?: ReactNode;
  className?: string;
}

interface ChatTranscriptRow {
  id: string;
  speaker: string;
  role: ChatTranscriptRole;
  time?: ReactNode;
  messages: ChatTranscriptMessage[];
}

export type { ChatToolStatus, ChatTranscriptMessage, ChatTranscriptProps, ChatTranscriptRole, ChatTranscriptRow, ChatTranscriptTool };
