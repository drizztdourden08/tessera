/* @layer renderer-components @kind logic */
import { DEFAULT_SESSION_VIEW } from '../session-view';
import type { SessionView } from '../session-view';
import type { ViewKey } from '../snapshot';
import { views } from './views';

const getSessionView = (key: ViewKey): SessionView => views.get(key) ?? DEFAULT_SESSION_VIEW;

export { getSessionView };
