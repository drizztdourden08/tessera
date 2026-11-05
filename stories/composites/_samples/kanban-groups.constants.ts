/* @layer stories @kind data */
import type { Task, TaskColumn } from './kanban-board.type';

const GROUP_OF: Readonly<Record<string, string>> = { login: 'auth', tour: 'auth', export: 'auth', dark: 'auth' };

const GROUP_TITLES: Readonly<Record<string, string>> = { auth: 'Sign in rework' };

const grouped = (task: Task): Task => {
  const group = GROUP_OF[task.id];
  return group === undefined ? task : { ...task, group };
};

const withGroups = (columns: readonly TaskColumn[]): TaskColumn[] => columns.map((column) => ({ ...column, cards: column.cards.map(grouped) }));

export { GROUP_TITLES, withGroups };
