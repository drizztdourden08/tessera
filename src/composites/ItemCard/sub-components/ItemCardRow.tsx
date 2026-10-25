/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Status } from '../../../primitives/Status';
import { ActionBar } from '../../ActionBar';
import { ICON_ACTIONS_MAX } from '../ItemCard.constants';
import type { ItemCardRowProps } from '../ItemCard.type';
import { ItemCardDetails } from './ItemCardDetails';
import { ItemCardTitle } from './ItemCardTitle';
import './ItemCardRow.css';

const ItemCardRow = (props: ItemCardRowProps) => {
  const { tile, title, status, details = [], actions = [], level = 3, href, navigate, onOpen, selected } = props;
  const icons = actions.map((action) => ({ ...action, iconOnly: true as const }));
  const keep = Math.max(1, ICON_ACTIONS_MAX - actions.filter((action) => action.kind === 'primary').length);
  return (
    <Box className="item-card__body" data-density="compact">
      {tile}
      <Box className="item-card__heading">
        <ItemCardTitle title={title} href={href} navigate={navigate} onOpen={onOpen} selected={selected} level={level} />
        {(status !== undefined || details.length > 0) && (
          <Box className="item-card__line">
            {status && <Status tone={status.tone} dot>{status.label}</Status>}
            {details.length > 0 && <ItemCardDetails details={details} />}
          </Box>
        )}
      </Box>
      {icons.length > 0 && <Box className="item-card__actions"><ActionBar actions={icons} size="sm" keep={keep} /></Box>}
    </Box>
  );
};

export { ItemCardRow };
