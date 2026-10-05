/* @layer stories @kind component */
import { ItemList } from '../../../src/composites';
import { Card } from '../../../src/primitives';
import type { ItemListCreateDemoProps } from './profile-samples.type';
import { useSampleProfiles } from './useSampleProfiles';

const ItemListCreateDemo = ({ firstRun = false }: ItemListCreateDemoProps) => {
  const sample = useSampleProfiles(firstRun);
  return (
    <Card className="item-list-story">
      <ItemList {...sample.list} onSelect={sample.pick} />
    </Card>
  );
};

export { ItemListCreateDemo };
