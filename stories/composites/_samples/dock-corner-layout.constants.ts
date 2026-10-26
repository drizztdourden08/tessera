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

const CORNER_ONE_LAYOUT: unknown = {
  v: 2,
  dock: {
    kind: 'split',
    axis: 'column',
    sizes: [0.74, 0.26],
    children: [
      {
        kind: 'split',
        axis: 'row',
        sizes: [0.26, 0.74],
        children: [
          { kind: 'pane', key: 'corner-left', widgets: ['players'], active: 'players', makeRoom: true },
          { kind: 'main', key: 'main' },
        ],
      },
      { kind: 'pane', key: 'corner-bottom', widgets: ['log'], active: 'log', makeRoom: true },
    ],
  },
  floating: [],
  popped: [],
  frame: {},
};

const CORNER_ONE_HINT = 'The left panel has taken the top left corner and runs down to the log. Drag its bottom end down, or press the down arrow on it, to take the bottom corner too; drag or press up to give it back.';

const CORNER_HINT = 'The left panel owns both left corners. Drag the left end of Hints or the log outward, or press the left arrow on it, to take a corner; drag or press the right arrow to give it back.';

const CORNER_HEADER_HINT = 'Each title bar keeps its buttons clear: a corner handle is 24 px wide and starts below the title bar, so Pop out, Options and Close stay easy to hit.';

const WEIGHTED_HINT = 'Hints joined Players on the left edge with dockWeight 2, so it takes two thirds of the column and Players one third.';

export { CORNER_HEADER_HINT, CORNER_HINT, CORNER_LAYOUT, CORNER_ONE_HINT, CORNER_ONE_LAYOUT, WEIGHTED_HINT };
