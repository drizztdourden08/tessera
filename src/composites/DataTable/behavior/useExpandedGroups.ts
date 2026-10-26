/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { collectGroupUids } from './collect-group-uids';
import type { ExpandedGroups, UseExpandedGroupsInput } from './useExpandedGroups.type';

const sameMembers = (a: readonly string[], b: ReadonlySet<string>): boolean =>
  a.length === b.size && a.every((entry) => b.has(entry));

const useExpandedGroups = (input: UseExpandedGroupsInput): ExpandedGroups => {
  const { groupedRows, groupBy, defaultExpanded, sessionView, setSessionView, controlled, onChange } = input;
  const signature = groupBy.join('|');
  const seeded = useRef<string | null>(null);
  const ruleRef = useRef(defaultExpanded);
  ruleRef.current = defaultExpanded;

  const expanded = useMemo(
    () => controlled ?? new Set(sessionView.expanded),
    [controlled, sessionView.expanded],
  );

  useEffect(() => {
    if (controlled) return;
    if (seeded.current === signature) return;
    if (groupedRows.length === 0 && signature !== '') return;
    seeded.current = signature;
    const all = collectGroupUids(groupedRows, ruleRef.current);
    if (sameMembers(all, expanded)) return;
    setSessionView({ ...sessionView, expanded: all });
  }, [signature, groupedRows]);

  const toggle = useCallback((uid: string) => {
    const next = expanded.has(uid)
      ? [...expanded].filter((entry) => entry !== uid)
      : [...expanded, uid];
    if (!controlled) setSessionView({ ...sessionView, expanded: next });
    onChange?.(new Set(next));
  }, [expanded, controlled, sessionView, setSessionView, onChange]);

  const isExpanded = useCallback((uid: string) => expanded.has(uid), [expanded]);

  return useMemo(() => ({ isExpanded, toggle }), [isExpanded, toggle]);
};

export { useExpandedGroups };
