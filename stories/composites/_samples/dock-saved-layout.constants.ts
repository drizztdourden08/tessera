/* @layer stories @kind data */
const SAVED_WITHOUT_MAKE_ROOM: unknown = {
  v: 2,
  dock: {
    kind: 'split',
    axis: 'row',
    sizes: [0.28, 0.72],
    children: [
      { kind: 'pane', key: 'saved-left', widgets: ['players', 'hints'], active: 'players' },
      {
        kind: 'split',
        axis: 'column',
        sizes: [0.68, 0.32],
        children: [{ kind: 'main', key: 'main' }, { kind: 'pane', key: 'saved-bottom', widgets: ['log'], active: 'log' }],
      },
    ],
  },
  floating: [],
  popped: [],
  frame: {},
};

const SAVED_HINT = 'This layout was saved before panes stored makeRoom. Its panes make room, so this text and the main view stay in view.';

export { SAVED_HINT, SAVED_WITHOUT_MAKE_ROOM };
