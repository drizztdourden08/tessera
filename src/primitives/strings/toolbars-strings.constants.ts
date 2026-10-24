/* @layer renderer-components @kind data */
const TOOLBARS_STRINGS = {
  menu: 'Toolbars',
  reset: 'Reset toolbars',
  guideTitle: 'Moving toolbar',
  move: (label: string) => `Move ${label}`,
  basket: 'Release to hide',
  sides: { top: 'top', bottom: 'bottom', left: 'left', right: 'right' },
  lanes: { outer: 'outer lane', inner: 'inner lane' },
  pickedUp: (label: string) => `${label}: picked up. Arrow keys choose a side, Delete hides it, Enter drops it, Escape cancels.`,
  place: (label: string, side: string, lane: string) => `${label}: ${side}, ${lane}`,
  full: (label: string, side: string) => `${label}: ${side} is full`,
  willHide: (label: string) => `${label}: hide`,
  movedTo: (label: string, side: string, lane: string) => `${label} moved to ${side}, ${lane}`,
  stayed: (label: string) => `${label} stays where it was`,
  hidden: (label: string) => `${label} hidden`,
  cancelled: (label: string) => `${label}: move cancelled`,
  hintSide: (side: string) => `Go to the ${side}, again for the other lane`,
  hintHide: 'Hide the toolbar',
  hintDrop: 'Drop the toolbar',
  hintCancel: 'Cancel the move',
};

export { TOOLBARS_STRINGS };
