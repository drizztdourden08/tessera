/* @layer renderer-components @kind types */
import type { SchemaLike } from '../../schema/build-schema';
import type { TableColumn } from '../../table/types';
import type { SessionView } from '../session-view';
import type { ViewKey, ViewSnapshot } from '../snapshot';
import type { ViewStorage } from '../view-storage';

interface UseViewStateParams {
  key: ViewKey | undefined;
  schema: SchemaLike;
  fallbackColumns: readonly TableColumn[];
  fallbackGroupBy?: readonly string[];
  storage?: ViewStorage;
}

interface UseViewStateResult {
  snapshot: ViewSnapshot;
  sessionView: SessionView;
  setSnapshot: (next: ViewSnapshot) => void;
  setSessionView: (next: SessionView) => void;
}

export type { UseViewStateParams, UseViewStateResult };
