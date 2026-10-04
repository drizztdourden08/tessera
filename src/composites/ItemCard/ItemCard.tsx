/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Card } from '../../primitives/Card';
import { ItemCardFoot } from './sub-components/ItemCardFoot';
import { ItemCardTitle } from './sub-components/ItemCardTitle';
import { ItemCardTop } from './sub-components/ItemCardTop';
import type { ItemCardProps } from './ItemCard.type';
import './ItemCard.css';

const flag = (on: boolean | undefined): '' | undefined => (on ? '' : undefined);

const ItemCard = (props: ItemCardProps) => {
  const { title, eyebrow, status, tags, details, media, mediaTone = 'primary', layout = 'top', href, actions, selected, onOpen, level = 3, className } = props;
  return (
    <Card
      className={className ? `item-card ${className}` : 'item-card'}
      data-layout={layout}
      data-selected={flag(selected)}
      data-opens={flag(href !== undefined || onOpen !== undefined)}
    >
      {media && <Box className="item-card__media" data-tone={mediaTone} aria-hidden>{media}</Box>}
      <Box className="item-card__body">
        <ItemCardTop eyebrow={eyebrow} status={status} />
        <ItemCardTitle title={title} href={href} onOpen={onOpen} selected={selected} level={level} />
        <ItemCardFoot tags={tags} details={details} actions={actions} />
      </Box>
    </Card>
  );
};

export { ItemCard };
