/* @layer renderer-components @kind logic */
import { FADE_SLACK_PX } from '../ScrollArea.constants';
import type { ThumbSpan } from './slim-thumb.type';

const slimThumbSpan = (viewport: number, content: number, scrolled: number): ThumbSpan | null => {
  const range = content - viewport;
  if (viewport <= 0 || range <= FADE_SLACK_PX) return null;
  return { fraction: viewport / content, progress: Math.min(1, Math.max(0, scrolled / range)), range };
};

export { slimThumbSpan };
