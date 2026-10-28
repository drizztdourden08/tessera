/* @layer renderer-components @kind component */
import { useCallback, useMemo } from 'react';
import { Badge } from '../../primitives/Badge';
import { Icon } from '../../primitives/Icon';
import { Span } from '../../primitives/text-elements';
import { Tree } from '../Tree';
import { groupEntriesOf } from './behavior/group-entries-of';
import { keysToDepth } from './behavior/keys-to-depth';
import { selectionKey } from './behavior/selection-key';
import type { TreeRowState } from '../Tree';
import type { GroupEntry, GroupTreeProps } from './GroupTree.type';
import './GroupTree.css';

const labelOf = <T,>(entry: GroupEntry<T>): string => entry.label;
const keyOf = <T,>(entry: GroupEntry<T>): string => entry.key;
const childrenOf = <T,>(entry: GroupEntry<T>): readonly GroupEntry<T>[] | undefined => entry.children;

const GroupTree = <T,>(props: GroupTreeProps<T>) => {
  const {
    root, getItemKey, renderItem, itemIcon, selectedKey = null, onSelect, onActivate,
    expandToDepth = 0, expandedKeys, onExpandedChange, showCounts = true, label, emptyLabel, className,
  } = props;
  const entries = useMemo(() => groupEntriesOf(root, getItemKey), [root, getItemKey]);
  const initial = useMemo(() => keysToDepth(root, expandToDepth), [root, expandToDepth]);
  const picked = useMemo(() => new Set(selectedKey === null ? [] : (entries.bySelection.get(selectedKey) ?? [])), [entries, selectedKey]);

  const onChange = useCallback((keys: ReadonlySet<string>) => {
    const key = keys.values().next().value;
    const entry = key === undefined ? undefined : entries.byKey.get(key);
    if (entry) onSelect?.(selectionKey(entry), entry.kind === 'item' ? entry.item : undefined);
  }, [entries, onSelect]);

  const renderLead = useCallback((entry: GroupEntry<T>, state: TreeRowState) => {
    if (entry.kind === 'item') return itemIcon?.(entry.item);
    return entry.node.icon ?? <Icon name={state.expanded ? 'folder-open' : 'folder'} />;
  }, [itemIcon]);

  const renderLabel = useCallback((entry: GroupEntry<T>) => (entry.kind === 'item' ? renderItem(entry.item) : entry.label), [renderItem]);

  const renderTrail = useCallback((entry: GroupEntry<T>) => {
    if (entry.kind === 'item') return undefined;
    return (
      <>
        {entry.node.meta != null && <Span tone="muted" className="group-tree__meta">{entry.node.meta}</Span>}
        {showCounts && <Badge variant="inline" color="tame" value={entry.count} className="group-tree__count" />}
      </>
    );
  }, [showCounts]);

  return (
    <Tree
      items={entries.top}
      getKey={keyOf}
      getChildren={childrenOf}
      getLabel={labelOf}
      label={label ?? root.label}
      emptyLabel={emptyLabel}
      renderLead={renderLead}
      renderLabel={renderLabel}
      renderTrail={renderTrail}
      defaultExpandedKeys={initial}
      expandedKeys={expandedKeys}
      onExpandedChange={onExpandedChange}
      selection={{ selected: picked, onChange, mode: 'single' }}
      onActivate={(entry) => entry.kind === 'item' && onActivate?.(entry.item)}
      openOnPick
      guides
      className={`group-tree${className ? ` ${className}` : ''}`}
    />
  );
};

export { GroupTree };
