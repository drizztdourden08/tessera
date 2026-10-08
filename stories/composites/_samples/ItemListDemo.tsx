/* @layer stories @kind component */
import { useState } from 'react';
import { ItemList } from '../../../src/composites';
import { Card, Icon } from '../../../src/primitives';
import { presetGames } from './preset-games';
import { presetGroup } from './preset-group';
import { presetRow } from './preset-row';
import { LIST_DEMO, PRESETS_EMPTY, SERVERS_ERROR } from './preset-samples.constants';
import type { ItemListDemoProps, SamplePreset } from './preset-samples.type';
import { useSamplePresets } from './useSamplePresets';

const idOf = (preset: SamplePreset) => preset.id;
const nameOf = (preset: SamplePreset) => preset.name;
const ignore = () => undefined;

const ItemListDemo = (props: ItemListDemoProps) => {
  const { state, grouped, filter, actions, emptyGame, title, createLabel } = { ...LIST_DEMO, ...props };
  const presets = useSamplePresets();
  const [selectedId, setSelectedId] = useState<string | null>('p2');
  const items = state === 'ready' ? presets.items : [];
  return (
    <Card className="item-list-story">
      <ItemList
        title={title}
        items={items}
        getId={idOf}
        getName={nameOf}
        render={presetRow}
        groupBy={grouped ? presetGroup : undefined}
        groups={grouped && emptyGame ? presetGames((game) => setSelectedId(presets.create('New preset', game))) : undefined}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onCreate={() => setSelectedId(presets.create())}
        createLabel={createLabel}
        {...(actions ? { onRename: presets.rename, onDelete: presets.remove } : {})}
        filter={filter || 'auto'}
        loading={state === 'loading'}
        error={state === 'error' && SERVERS_ERROR}
        onRetry={ignore}
        empty={PRESETS_EMPTY}
        emptyIcon={<Icon name="sliders-horizontal" />}
      />
    </Card>
  );
};

export { ItemListDemo };
