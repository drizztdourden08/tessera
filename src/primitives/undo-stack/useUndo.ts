/* @layer renderer-components @kind hook */
import { useEffect, useMemo, useRef } from 'react';
import { pageDocument } from '../dom/page-document';
import { useTesseraOverride } from '../TesseraProvider/behavior/useTesseraOverride';
import { undoStackOf } from './undo-stack-of';
import type { UndoStack } from './undo-stack.type';

const useUndo = (): UndoStack => {
  const doc = useTesseraOverride('portalDocument') ?? pageDocument();
  const own = useRef<Set<() => void>>(new Set());

  useEffect(() => {
    const mine = own.current;
    return () => [...mine].forEach((drop) => drop());
  }, []);

  return useMemo(() => undoStackOf(doc, own.current), [doc]);
};

export { useUndo };
