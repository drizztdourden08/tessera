/* @layer renderer-components @kind logic */
const barOrigin = (node: HTMLElement, inline: boolean): { x: number; y: number } => {
  const parent = inline ? node.offsetParent : null;
  if (!(parent instanceof HTMLElement)) return { x: 0, y: 0 };
  const rect = parent.getBoundingClientRect();
  return { x: rect.left + parent.clientLeft - parent.scrollLeft, y: rect.top + parent.clientTop - parent.scrollTop };
};

export { barOrigin };
