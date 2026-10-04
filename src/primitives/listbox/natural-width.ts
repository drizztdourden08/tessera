/* @layer renderer-components @kind util */
import { cssZoomOf } from '../dom/css-zoom-of';

const naturalWidth = (drop: HTMLElement): number => {
  const { width } = drop.style;
  drop.style.width = 'max-content';
  const measured = drop.getBoundingClientRect().width / cssZoomOf(drop);
  drop.style.width = width;
  return measured;
};

export { naturalWidth };
