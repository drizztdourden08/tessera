/* @layer renderer-components @kind component */
import { Fragment } from 'react';
import { DataRow } from './DataRow';
import { GroupNodeRow } from './GroupNodeRow';
import { groupUid } from '../behavior/group-uid';
import type { RowTreeProps } from './RowTree.type';

const RowTree = <T,>(props: RowTreeProps<T>) => {
  const { nodes, parentUid, context } = props;
  const { getRowId, isExpanded } = context;

  return (
    <>
      {nodes.map((node, index) => {
        if (node.kind === 'row') {
          return <DataRow key={getRowId(node.row)} row={node.row} context={context} />;
        }
        const uid = groupUid(parentUid, node.path, node.key);
        return (
          <Fragment key={`${uid}#${index}`}>
            <GroupNodeRow node={node} uid={uid} context={context} />
            {isExpanded(uid) && <RowTree nodes={node.children} parentUid={uid} context={context} />}
          </Fragment>
        );
      })}
    </>
  );
};

export { RowTree };
