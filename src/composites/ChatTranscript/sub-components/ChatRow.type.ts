/* @layer renderer-components @kind types */
import type { ChatTranscriptRow } from '../ChatTranscript.type';

interface ChatRowProps {
  row: ChatTranscriptRow;
  fresh?: boolean;
}

export type { ChatRowProps };
