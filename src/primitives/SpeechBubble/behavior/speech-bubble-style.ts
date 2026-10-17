/* @layer renderer-components @kind logic */
import type { CSSProperties } from 'react';

const speechBubbleStyle = (style: CSSProperties | undefined, offset: number | undefined, maxWidth: number | undefined): CSSProperties | undefined => {
  if (offset === undefined && maxWidth === undefined) return style;
  const vars: Record<string, string> = {};
  if (offset !== undefined) vars['--speech-offset'] = `${offset}px`;
  if (maxWidth !== undefined) vars['--speech-max'] = `${maxWidth}px`;
  return { ...style, ...vars };
};

export { speechBubbleStyle };
