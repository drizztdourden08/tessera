/* @layer renderer-components @kind constants */
import { defineStatuses } from '../../primitives/Status';
import type { TextProps } from '../../primitives/Text/Text.type';
import type { ChatTranscriptRole } from './ChatTranscript.type';

const CHAT_ROLE_TONES: Record<ChatTranscriptRole, NonNullable<TextProps['tone']>> = {
  user: 'primary',
  assistant: 'secondary',
  system: 'muted',
};

const CHAT_TOOL_STATUSES = defineStatuses({
  running: { label: 'Running', tone: 'info', pulse: true },
  done: { label: 'Done', tone: 'success' },
  failed: { label: 'Failed', tone: 'danger' },
});

const CHAT_WINDOW_ROWS = 30;

export { CHAT_WINDOW_ROWS, CHAT_ROLE_TONES, CHAT_TOOL_STATUSES };
