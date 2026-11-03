/* @layer renderer-components @kind logic */
const bodyShift = (scroller: HTMLElement, body: HTMLElement | null, across: boolean): number => {
  if (!body) return 0;
  const box = body.getBoundingClientRect();
  const view = scroller.getBoundingClientRect();
  if (across) return box.left - view.left - scroller.clientLeft + scroller.scrollLeft;
  return box.top - view.top - scroller.clientTop + scroller.scrollTop;
};

export { bodyShift };
