/* @layer renderer-components @kind logic */
const widthOf = (element: Element | undefined): number => element?.getBoundingClientRect().width ?? 0;

const sharePixels = (panes: HTMLElement | null): number => {
  if (!panes) return 0;
  const [list, , detail] = panes.children;
  return (widthOf(list) + widthOf(detail)) / 100;
};

export { sharePixels };
