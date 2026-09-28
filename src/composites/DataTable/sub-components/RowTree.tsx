/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { DataRow } from './DataRow';
import { GroupRow } from './GroupRow';
import { groupUid } from '../behavior/group-uid';
import type { RowTreeProps } from './RowTree.type';

const RowTree = <T,>(props: RowTreeProps<T>) => {
  const { nodes, parentUid, context } = props;
  const { columns, schema, getRowId, isExpanded, onToggleGroup, resolveIdRefDisplay, resolveIdRefDefault } = context;

  const displayFor = (path: string) => ({
    displayField: columns.find((column) => column.path === path)?.displayField,
    resolve: resolveIdRefDisplay,
    resolveDefault: resolveIdRefDefault,
  });

  return (
    <>
      {nodes.map((node, index) => {
        if (node.kind === 'row') {
          return <DataRow key={getRowId(node.row)} row={node.row} context={context} />;
        }
        const uid = groupUid(parentUid, node.path, node.key);
        const expanded = isExpanded(uid);
        return (
          <Fragment key={`${uid}#${index}`}>
            <GroupRow
              level={node.level}
              groupKey={node.key}
              field={schema.byPath(node.path)}
              count={node.count}
              expanded={expanded}
              onToggle={() => onToggleGroup(uid)}
              display={displayFor(node.path)}
            />
            {expanded && <RowTree nodes={node.children} parentUid={uid} context={context} />}
          </Fragment>
        );
      })}
    </>
  );
};

export { RowTree };
