/* @layer renderer-components @kind data */
const KANBAN_BOARD_STRINGS = {
  board: 'Board',
  column: (title: string, count: number) => `${title}, ${count === 1 ? '1 card' : `${count} cards`}`,
  move: (name: string) => `Move ${name}`,
  moveHint: 'Drag, or press Up, Down, Left or Right',
  moved: (name: string, column: string, position: number, total: number) => `${name} moved to ${column}, position ${position} of ${total}`,
  collapse: (title: string) => `Collapse ${title}`,
  expand: (title: string) => `Expand ${title}`,
  empty: 'No cards',
};

export { KANBAN_BOARD_STRINGS };
