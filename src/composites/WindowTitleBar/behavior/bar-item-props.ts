/* @layer renderer-components @kind logic */
import { ITEM_ATTRIBUTE, ITEM_AWAY_CLASS } from '../WindowTitleBar.constants';

const barItemProps = (id: string, away: boolean, className = '') => ({
  [ITEM_ATTRIBUTE]: id,
  className: [className, away && ITEM_AWAY_CLASS].filter(Boolean).join(' '),
  inert: away || undefined,
});

export { barItemProps };
