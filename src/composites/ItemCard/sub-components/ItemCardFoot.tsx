/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { ActionBar } from '../../ActionBar';
import type { ItemCardFootProps } from '../ItemCard.type';
import { ItemCardDetails } from './ItemCardDetails';

const ItemCardFoot = (props: ItemCardFootProps) => {
  const { tags = [], details = [], actions = [] } = props;
  return (
    <>
      {tags.length > 0 && <Box className="item-card__tags">{tags}</Box>}
      {details.length > 0 && <ItemCardDetails details={details} />}
      {actions.length > 0 && <Box className="item-card__actions"><ActionBar actions={actions} size="sm" keep={1} /></Box>}
    </>
  );
};

export { ItemCardFoot };
