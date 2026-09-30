/* @layer renderer-components @kind util */
const naturalWidth = (drop: HTMLElement): number => {
  const { width } = drop.style;
  drop.style.width = 'max-content';
  const measured = drop.getBoundingClientRect().width;
  drop.style.width = width;
  return measured;
};

export { naturalWidth };
