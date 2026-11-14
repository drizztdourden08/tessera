/* @layer renderer-components @kind logic */
import type { ChatTranscriptMessage, ChatTranscriptRow } from '../ChatTranscript.type';

const chatRows = (messages: readonly ChatTranscriptMessage[]): ChatTranscriptRow[] => {
  const rows: ChatTranscriptRow[] = [];
  messages.forEach((message) => {
    const last = rows[rows.length - 1];
    if (last && last.speaker === message.speaker) last.messages.push(message);
    else rows.push({ id: message.id, speaker: message.speaker, role: message.role ?? 'assistant', time: message.time, messages: [message] });
  });
  return rows;
};

export { chatRows };
