/* @layer stories @kind component */
import { ItemList } from '../../../src/composites';
import { Card, Text } from '../../../src/primitives';
import { useSampleProfiles } from './useSampleProfiles';

const ItemListSwitchDemo = () => {
  const sample = useSampleProfiles(false);
  const active = sample.list.items.find((profile) => profile.id === sample.list.selectedId);
  return (
    <Card className="item-list-story item-list-story--switch">
      <ItemList {...sample.list} onActivate={sample.pick} onRename={sample.rename} onDelete={sample.remove} actionVisibility="always" />
      <Text variant="caption">{active ? `Playing with ${active.name}` : 'No profile is active'}</Text>
    </Card>
  );
};

export { ItemListSwitchDemo };
