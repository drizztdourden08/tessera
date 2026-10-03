/* @layer root-config @kind logic */
import { lucideBody } from './lucide-body';
import { REVIEW_CSS } from './review-css.constants';
import { REVIEW_NOTE_ICONS } from './review-options.constants';

const reviewCss = (root: string): string => {
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${lucideBody(root, REVIEW_NOTE_ICONS.open)}</svg>`;
  return `:root { --review-note-icon: url("data:image/svg+xml,${encodeURIComponent(icon)}"); }\n${REVIEW_CSS}`;
};

export { reviewCss };
