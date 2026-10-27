/* @layer renderer-components @kind util */
import type { CardProps } from '../Card.type';

const cardClass = (props: CardProps, headed: boolean): string => {
  const { variant = 'default', edgeTone, edge = 'left', fill = false, flush = false, className = '' } = props;
  const edged = edgeTone === undefined ? [] : [`card--edge-${edge}`, `card--edge-${edgeTone}`];
  return ['card', `card--${variant}`, ...edged, headed && 'card--headed', fill && 'card--fill', flush && 'card--flush', className].filter(Boolean).join(' ');
};

export { cardClass };
