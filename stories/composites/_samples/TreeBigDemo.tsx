/* @layer stories @kind component */
import { useMemo } from 'react';
import { bigTree } from './tree-entries';
import { TreeDemo } from './TreeDemo';

const TreeBigDemo = () => {
  const start = useMemo(() => bigTree(), []);
  const open = useMemo(() => start.map((entry) => entry.id), [start]);
  return <TreeDemo start={start} open={open} rowSize="compact" guides />;
};

export { TreeBigDemo };
