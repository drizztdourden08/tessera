/* @layer renderer-components @kind util */
import type { CardProps } from '../Card.type';
import { MODIFIERS } from './card-class.constants';

const cardClass = (props: CardProps, headed: boolean): string => {
  const { variant = 'default', edgeTone, edge = 'left', className = '' } = props;
  const edged = edgeTone === undefined ? [] : [`card--edge-${edge}`, `card--edge-${edgeTone}`];
  const modifiers = MODIFIERS.filter((name) => props[name] === true).map((name) => `card--${name}`);
  return ['card', `card--${variant}`, ...edged, headed && 'card--headed', ...modifiers, className].filter(Boolean).join(' ');
};

export { cardClass };
