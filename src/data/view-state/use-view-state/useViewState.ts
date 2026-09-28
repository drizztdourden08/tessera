/* @layer renderer-components @kind logic */
import { useCallback, useEffect, useState } from 'react';
import { beginDurableLoad } from '../durable-load';
import { createLoadGuard } from '../createLoadGuard';
import { emptySnapshotFor } from '../emptySnapshotFor';
import { DEFAULT_SESSION_VIEW } from '../session-view';
import type { SessionView } from '../session-view';
import { setSessionView as setStoredSession, useSessionView } from '../session-view-store';
import type { ViewSnapshot } from '../snapshot';
import { useViewStorage } from '../view-storage';
import type { UseViewStateParams, UseViewStateResult } from './useViewState.type';

const useViewState = (params: UseViewStateParams): UseViewStateResult => {
  const { key, schema, fallbackColumns, fallbackGroupBy, storage: storageOverride } = params;
  const contextStorage = useViewStorage();
  const storage = storageOverride ?? contextStorage;
  const [localSnapshot, setLocalSnapshot] = useState<ViewSnapshot>(
    () => emptySnapshotFor(fallbackColumns, fallbackGroupBy),
  );
  const [localSession, setLocalSession] = useState<SessionView>(DEFAULT_SESSION_VIEW);
  const [loadGuard] = useState(createLoadGuard);

  const storedSession = useSessionView(key);

  useEffect(() => {
    if (!key) {
      loadGuard.cancel();
      return;
    }
    beginDurableLoad({
      guard: loadGuard,
      load: () => storage.load(key),
      schema,
      fallbackColumns,
      fallbackGroupBy,
      apply: setLocalSnapshot,
    });
    return () => { loadGuard.cancel(); };
  }, [key]);

  const setSnapshot = useCallback((next: ViewSnapshot) => {
    loadGuard.markEdited();
    setLocalSnapshot(next);
    if (key) storage.save(key, next);
  }, [key, storage]);

  const setSessionView = useCallback((next: SessionView) => {
    if (key) setStoredSession(key, next);
    else setLocalSession(next);
  }, [key, setStoredSession]);

  return {
    snapshot: localSnapshot,
    sessionView: key ? storedSession : localSession,
    setSnapshot,
    setSessionView,
  };
};

export { useViewState };
