/* @layer renderer-components @kind component */
import { Card } from '../../primitives/Card';
import { isTiled } from './behavior/is-tiled';
import { opens } from './behavior/opens';
import { ItemCardBody } from './sub-components/ItemCardBody';
import { ItemCardMedia } from './sub-components/ItemCardMedia';
import { ItemCardRow } from './sub-components/ItemCardRow';
import type { ItemCardProps } from './ItemCard.type';
import './ItemCard.css';

const flag = (on: boolean | undefined): '' | undefined => (on ? '' : undefined);

const ItemCard = (props: ItemCardProps) => {
  const { media, mediaTone, mediaHeight, layout = 'top', selected, className } = props;
  const compact = props.density === 'compact';
  const tiled = isTiled(props);
  const picture = <ItemCardMedia media={media} tone={mediaTone} height={mediaHeight} tiled={tiled} />;
  const tile = tiled ? picture : undefined;
  return (
    <Card
      className={className ? `item-card ${className}` : 'item-card'}
      data-layout={layout}
      data-density={compact ? 'compact' : undefined}
      data-selected={flag(selected)}
      data-opens={flag(opens(props))}
    >
      {!tiled && picture}
      {compact ? <ItemCardRow {...props} tile={tile} /> : <ItemCardBody {...props} tile={media ? tile : undefined} />}
    </Card>
  );
};

export { ItemCard };
