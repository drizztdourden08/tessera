/* @layer renderer-components @kind util */
import { FOLDED_CLASS } from '../StudioLayout.constants';

const stackKey = (body: HTMLElement): string => {
  const folds = [...body.children].map((child) => (child.classList.contains(FOLDED_CLASS) ? 'f' : 'o')).join('');
  return `${body.getBoundingClientRect().width}:${folds}`;
};

export { stackKey };
