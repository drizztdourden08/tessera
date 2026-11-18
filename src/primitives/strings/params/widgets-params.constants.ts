/* @layer renderer-components @kind data */
const WIDGETS_PARAMS = {
  pinTitle: ['choice'],
  optionsFor: ['title'],
  closeNamed: ['name'],
  popOutNamed: ['name'],
  popInNamed: ['name'],
  moveNamed: ['name'],
  opacityValue: ['percent'],
  guideAnnounce: ['mode', 'snapping'],
  moveMainHint: ['mainLabel'],
  dragSwapLabel: ['label'],
  dragOverlayLabel: ['label'],
  cornerLabel: ['pane', 'corner'],
  cornerTaken: ['pane', 'corner'],
  cornerGiven: ['pane', 'corner'],
} as const;

export { WIDGETS_PARAMS };
