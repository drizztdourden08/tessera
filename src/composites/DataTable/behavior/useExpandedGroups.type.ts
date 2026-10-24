/* @layer renderer-components @kind types */
import type { SessionView } from '../../../data/view-state/session-view';
import type { GroupedRow } from '../../../data/table/types';
import type { DefaultExpanded } from '../DataTable.type';

interface UseExpandedGroupsInput {
  groupedRows: readonly GroupedRow<unknown>[];
  groupBy: readonly string[];
  defaultExpanded?: DefaultExpanded;
  sessionView: SessionView;
  setSessionView: (next: SessionView) => void;
}

interface ExpandedGroups {
  isExpanded: (uid: string) => boolean;
  toggle: (uid: string) => void;
}

export type { ExpandedGroups, UseExpandedGroupsInput };
