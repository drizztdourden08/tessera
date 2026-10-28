/* @layer renderer-components @kind util */
import type { CardProps } from '../Card.type';

const FLAGS = ['fill', 'flush', 'container'] as const;

const cardClass = (props: CardProps, headed: boolean): string => {
  const { variant = 'default', edgeTone, edge = 'left', className = '' } = props;
  const edged = edgeTone === undefined ? [] : [`card--edge-${edge}`, `card--edge-${edgeTone}`];
  const flags = FLAGS.filter((flag) => props[flag] === true).map((flag) => `card--${flag}`);
  return ['card', `card--${variant}`, ...edged, headed && 'card--headed', ...flags, className].filter(Boolean).join(' ');
};

export { cardClass };
