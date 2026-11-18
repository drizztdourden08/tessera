/* @layer renderer-components @kind data */
const TOOLBARS_PARAMS = {
  move: ['label'],
  pickedUp: ['label'],
  place: ['label', 'side', 'lane'],
  full: ['label', 'side'],
  willHide: ['label'],
  movedTo: ['label', 'side', 'lane'],
  stayed: ['label'],
  hidden: ['label'],
  cancelled: ['label'],
  hintSide: ['side'],
  slot: ['label', 'position', 'count'],
  resizeHandle: ['label', 'end'],
  resizeStart: ['label'],
  resizeEnd: ['label'],
  pushed: ['label', 'others'],
  cornerTaken: ['label', 'corner'],
  cornerGiven: ['label', 'corner'],
} as const;

export { TOOLBARS_PARAMS };
