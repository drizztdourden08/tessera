/* @layer renderer-components @kind util */
import { BADGE_TEXT } from '../Badge.constants';

const sanitiseBadgeText = (text: string): string => {
  if (BADGE_TEXT.test(text)) return text;
  const kept = text.replace(/[^\p{L}\p{N}]/gu, '');
  return text.endsWith('+') && /^\p{N}+$/u.test(kept) ? `${kept}+` : kept;
};

export { sanitiseBadgeText };
