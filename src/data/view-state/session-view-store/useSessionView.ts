/* @layer renderer-components @kind hook */
import { useSyncExternalStore } from 'react';
import { DEFAULT_SESSION_VIEW } from '../session-view';
import type { SessionView } from '../session-view';
import type { ViewKey } from '../snapshot';
import { getSessionView } from './get-session-view';
import { listeners } from './listeners';

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

const useSessionView = (key: ViewKey | undefined): SessionView =>
  useSyncExternalStore(subscribe, () => (key ? getSessionView(key) : DEFAULT_SESSION_VIEW));

export { useSessionView };
