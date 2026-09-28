/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { collectGroupUids } from './collectGroupUids';
import type { ExpandedGroups, UseExpandedGroupsInput } from './useExpandedGroups.type';

const sameMembers = (a: readonly string[], b: ReadonlySet<string>): boolean =>
  a.length === b.size && a.every((entry) => b.has(entry));

const useExpandedGroups = (input: UseExpandedGroupsInput): ExpandedGroups => {
  const { groupedRows, groupBy, sessionView, setSessionView } = input;
  const signature = groupBy.join('|');
  const seeded = useRef<string | null>(null);

  const expanded = useMemo(() => new Set(sessionView.expanded), [sessionView.expanded]);

  useEffect(() => {
    if (seeded.current === signature) return;
    seeded.current = signature;
    const all = collectGroupUids(groupedRows);
    if (sameMembers(all, expanded)) return;
    setSessionView({ ...sessionView, expanded: all });
  }, [signature, groupedRows]);

  const toggle = useCallback((uid: string) => {
    const next = expanded.has(uid)
      ? sessionView.expanded.filter((entry) => entry !== uid)
      : [...sessionView.expanded, uid];
    setSessionView({ ...sessionView, expanded: next });
  }, [expanded, sessionView, setSessionView]);

  const isExpanded = useCallback((uid: string) => expanded.has(uid), [expanded]);

  return useMemo(() => ({ isExpanded, toggle }), [isExpanded, toggle]);
};

export { useExpandedGroups };
