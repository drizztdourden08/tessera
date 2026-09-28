/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BOTTOM_SLACK, CHUNK } from './useLogWindow.constants';

const useLogWindow = (total: number) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(CHUNK);
  const atBottom = useRef(true);
  const pendingAnchor = useRef<number | null>(null);

  useEffect(() => {
    if (total < visible) setVisible(Math.min(CHUNK, Math.max(total, 1)));
  }, [total, visible]);

  const loadOlder = useCallback(() => {
    const el = scrollRef.current;
    pendingAnchor.current = el ? el.scrollHeight - el.scrollTop : null;
    setVisible((v) => Math.min(total, v + CHUNK));
  }, [total]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || pendingAnchor.current === null) return;
    el.scrollTop = el.scrollHeight - pendingAnchor.current;
    pendingAnchor.current = null;
  }, [visible]);

  const jumpToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    atBottom.current = true;
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    atBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight <= BOTTOM_SLACK;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && atBottom.current && pendingAnchor.current === null) el.scrollTop = el.scrollHeight;
  }, [total, visible]);

  const shownCount = Math.min(visible, total);
  return { scrollRef, shownCount, hiddenOlder: total - shownCount, loadOlder, jumpToBottom, handleScroll };
};

export { useLogWindow };
