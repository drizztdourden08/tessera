/* @layer stories @kind data */
const ROW_GRID_STRINGS = {
  row: (position: number) => `Row ${position}`,
  rowNamed: (position: number, name: string) => `${name}, row ${position}`,
  move: (name: string) => `Move ${name}`,
  moveHint: 'Drag, or press Up or Down',
  moveUp: 'Move up',
  moveDown: 'Move down',
  remove: (name: string) => `Remove ${name}`,
  more: (name: string) => `More for ${name}`,
  moved: (name: string, position: number, total: number) => `${name} moved to row ${position} of ${total}`,
  removed: (name: string) => `${name} removed`,
  added: (position: number) => `Row ${position} added`,
  empty: 'No rows yet.',
  add: 'Add a row',
};

export { ROW_GRID_STRINGS };
