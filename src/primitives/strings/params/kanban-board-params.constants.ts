/* @layer renderer-components @kind data */
const KANBAN_BOARD_PARAMS = {
  column: ['title', 'count'],
  move: ['name'],
  moved: ['name', 'column', 'position', 'total'],
  collapse: ['title'],
  expand: ['title'],
} as const;

export { KANBAN_BOARD_PARAMS };
