/* @layer renderer-components @kind types */
import type { SessionView } from '../../../data/view-state/session-view';
import type { GroupedRow } from '../../../data/table/types';

interface UseExpandedGroupsInput {
  groupedRows: readonly GroupedRow<unknown>[];
  groupBy: readonly string[];
  sessionView: SessionView;
  setSessionView: (next: SessionView) => void;
}

interface ExpandedGroups {
  isExpanded: (uid: string) => boolean;
  toggle: (uid: string) => void;
}

export type { ExpandedGroups, UseExpandedGroupsInput };
