/* @layer stories @kind data */
const CORNER_LAYOUT: unknown = {
  v: 2,
  dock: {
    kind: 'split',
    axis: 'row',
    sizes: [0.24, 0.76],
    children: [
      { kind: 'pane', key: 'corner-left', widgets: ['players'], active: 'players', makeRoom: true },
      {
        kind: 'split',
        axis: 'column',
        sizes: [0.22, 0.52, 0.26],
        children: [
          { kind: 'pane', key: 'corner-top', widgets: ['hints'], active: 'hints', makeRoom: true },
          { kind: 'main', key: 'main' },
          { kind: 'pane', key: 'corner-bottom', widgets: ['log'], active: 'log', makeRoom: true },
        ],
      },
    ],
  },
  floating: [],
  popped: [],
  frame: {},
};

const CORNER_HINT = 'The left panel owns both left corners. Drag the left end of Hints or the log outward, or press the left arrow on it, to take a corner; drag or press the right arrow to give it back.';

export { CORNER_HINT, CORNER_LAYOUT };
