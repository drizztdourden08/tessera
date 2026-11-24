/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { ChatTranscriptRow } from '../ChatTranscript.type';

const useFreshRows = (rows: readonly ChatTranscriptRow[]): ReadonlySet<string> => {
  const seen = useRef<Set<string> | null>(null);
  const fresh = new Set<string>();
  const known = seen.current;
  if (known) rows.forEach((row) => { if (!known.has(row.id)) fresh.add(row.id); });
  useEffect(() => {
    seen.current = new Set(rows.map((row) => row.id));
  }, [rows]);
  return fresh;
};

export { useFreshRows };
