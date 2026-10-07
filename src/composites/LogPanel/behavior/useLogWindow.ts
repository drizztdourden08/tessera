/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { LogRow } from '../LogPanel.type';
import { appendedSince } from './appended-since';
import { nextLogWindow } from './next-log-window';
import { BOTTOM_SLACK, CHUNK } from './useLogWindow.constants';

const newest = (rows: readonly LogRow[]) => ({ id: rows[rows.length - 1]?.id, total: rows.length });

const useLogWindow = (rows: readonly LogRow[]) => {
  const total = rows.length;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(CHUNK);
  const [pinned, setPinned] = useState(true);
  const atBottom = useRef(true);
  const pendingAnchor = useRef<number | null>(null);
  const last = useRef(newest(rows));

  useLayoutEffect(() => {
    const before = last.current;
    last.current = newest(rows);
    if (before.id === last.current.id && before.total === total) return;
    const appended = appendedSince(rows, before.id, before.total);
    setVisible((v) => nextLogWindow(v, appended, total, atBottom.current));
  }, [rows, total]);

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
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    atBottom.current = true;
    setPinned(true);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    atBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight <= BOTTOM_SLACK;
    setPinned(atBottom.current);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && atBottom.current && pendingAnchor.current === null) el.scrollTop = el.scrollHeight;
  }, [total, visible]);

  const shownCount = Math.min(visible, total);
  return { scrollRef, shownCount, hiddenOlder: total - shownCount, pinned, loadOlder, jumpToBottom, handleScroll };
};

export { useLogWindow };
