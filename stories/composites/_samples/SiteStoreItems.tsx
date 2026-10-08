/* @layer stories @kind component */
import { ItemCard } from '../../../src/composites';
import { Grid, Icon } from '../../../src/primitives';
import { SITE_TEXT, STORE_ITEMS } from './site-samples.constants';
import type { StoreItemsProps } from './site-story.type';

const SiteStoreItems = ({ selectedId, onSelect }: StoreItemsProps) => (
  <Grid minColWidth={208} gap="md" aria-label={SITE_TEXT.popular}>
    {STORE_ITEMS.map((item) => (
      <ItemCard
        key={item.id}
        layout="left"
        title={item.name}
        eyebrow={item.kind}
        media={<Icon name={item.icon} size={24} />}
        mediaTone={item.tone}
        details={[item.installs]}
        selected={item.id === selectedId}
        onOpen={onSelect && (() => onSelect(item.id))}
      />
    ))}
  </Grid>
);

export { SiteStoreItems };
