/* @layer renderer-components @kind data */
const ROW_GRID_PARAMS = {
  row: ['position'],
  rowNamed: ['position', 'name'],
  move: ['name'],
  more: ['name'],
  moved: ['name', 'position', 'total'],
  removed: ['name'],
  added: ['position'],
} as const;

export { ROW_GRID_PARAMS };
