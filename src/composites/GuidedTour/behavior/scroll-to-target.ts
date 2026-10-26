/* @layer renderer-components @kind util */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';

const scrollToTarget = (target: HTMLElement): void => {
  const view = ownerWindowOf(target);
  const { width, height } = target.getBoundingClientRect();
  const block = height > view.innerHeight ? 'start' : 'center';
  const inline = width > view.innerWidth ? 'start' : 'center';
  target.scrollIntoView({ block, inline, behavior: 'instant' });
};

export { scrollToTarget };
