/* @layer renderer-components @kind util */
import type { CardClassInput } from './card-class.type';

const cardClass = (input: CardClassInput): string => {
  const { variant, edgeTone, edge, headed, fill, className } = input;
  const edged = edgeTone === undefined ? [] : [`card--edge-${edge}`, `card--edge-${edgeTone}`];
  return ['card', `card--${variant}`, ...edged, headed && 'card--headed', fill && 'card--fill', className].filter(Boolean).join(' ');
};

export { cardClass };
