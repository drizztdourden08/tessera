/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { ScrollPosition } from '../../../primitives/ScrollArea/ScrollArea.type';
import { CHAT_WINDOW_ROWS } from '../ChatTranscript.constants';
import type { ChatTranscriptRow, ChatWindow } from '../ChatTranscript.type';

const useWindowedRows = (rows: readonly ChatTranscriptRow[], nodeRef: RefObject<HTMLDivElement | null>): ChatWindow => {
  const [start, setStart] = useState(() => Math.max(0, rows.length - CHAT_WINDOW_ROWS));
  const from = Math.min(start, rows.length);
  const heightBefore = useRef<number | null>(null);

  const onScroll = useCallback(({ top }: ScrollPosition): void => {
    const node = nodeRef.current;
    if (!node || from === 0 || heightBefore.current !== null || top > node.clientHeight) return;
    heightBefore.current = node.scrollHeight;
    setStart(Math.max(0, from - CHAT_WINDOW_ROWS));
  }, [nodeRef, from]);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (heightBefore.current === null || !node) return;
    node.scrollTop += node.scrollHeight - heightBefore.current;
    heightBefore.current = null;
  }, [nodeRef, from]);

  return { visible: rows.slice(from), onScroll };
};

export { useWindowedRows };
