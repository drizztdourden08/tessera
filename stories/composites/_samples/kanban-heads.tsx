/* @layer stories @kind component */
import { Flex, Link, TypeMark } from '../../../src/primitives';
import { PARENT_HEADS } from './kanban-board.constants';
import type { TaskColumn } from './kanban-board.type';

const withHead = (column: TaskColumn): TaskColumn => {
  const head = PARENT_HEADS[column.id];
  if (!head) return column;
  const header = (
    <Flex gap="xs" align="center">
      <TypeMark icon={head.icon} label={head.label} color="violet" variant="outline" />
      <Link href="#" variant="subtle">{head.code}</Link>
    </Flex>
  );
  return { ...column, header };
};

const withHeads = (columns: TaskColumn[], on: boolean | undefined): TaskColumn[] => (on ? columns.map(withHead) : columns);

export { withHeads };
