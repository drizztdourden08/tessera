/* @layer renderer-components @kind logic */
const scrollToTop = (root: HTMLElement | null, onScroll: () => void): void => {
  if (!root) return;
  root.scrollTop = 0;
  onScroll();
};

export { scrollToTop };
