/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { groupActionItems } from '../behavior/group-action-items';
import { GroupRow } from './GroupRow';
import type { GroupNodeRowProps } from './GroupNodeRow.type';

const GroupNodeRow = <T,>(props: GroupNodeRowProps<T>) => {
  const { node, uid, context, index } = props;
  const { columns, schema, isExpanded, onToggleGroup, resolveIdRefDisplay, resolveIdRefDefault, groupActions } = context;
  const actions = useMemo(() => groupActionItems(node, groupActions), [node, groupActions]);

  return (
    <GroupRow
      level={node.level}
      groupKey={node.key}
      field={schema.byPath(node.path)}
      count={node.count}
      expanded={isExpanded(uid)}
      onToggle={() => onToggleGroup(uid)}
      display={{
        displayField: columns.find((column) => column.path === node.path)?.displayField,
        resolve: resolveIdRefDisplay,
        resolveDefault: resolveIdRefDefault,
      }}
      index={index}
      actions={actions}
    />
  );
};

export { GroupNodeRow };
