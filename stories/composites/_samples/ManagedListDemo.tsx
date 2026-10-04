/* @layer stories @kind component */
import { useState } from 'react';
import { ManagedList } from '../../../src/composites';
import { Box, Icon } from '../../../src/primitives';
import { presetGroup } from './preset-group';
import { presetRow } from './preset-row';
import { LIST_DEMO, PRESETS_EMPTY, SERVERS_ERROR } from './preset-samples.constants';
import type { ManagedListDemoProps, SamplePreset } from './preset-samples.type';
import { useSamplePresets } from './useSamplePresets';

const idOf = (preset: SamplePreset) => preset.id;
const nameOf = (preset: SamplePreset) => preset.name;

const ManagedListDemo = (props: ManagedListDemoProps) => {
  const { state, grouped, filter, actions, title, createLabel } = { ...LIST_DEMO, ...props };
  const presets = useSamplePresets();
  const [selectedId, setSelectedId] = useState<string | null>('p2');
  const items = state === 'ready' ? presets.items : [];
  return (
    <Box className="managed-list-story">
      <ManagedList
        title={title}
        items={items}
        getId={idOf}
        getName={nameOf}
        render={presetRow}
        groupBy={grouped ? presetGroup : undefined}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onCreate={() => setSelectedId(presets.create())}
        createLabel={createLabel}
        {...(actions ? { onRename: presets.rename, onDelete: presets.remove } : {})}
        filter={filter || 'auto'}
        loading={state === 'loading'}
        error={state === 'error' && SERVERS_ERROR}
        empty={PRESETS_EMPTY}
        emptyIcon={<Icon name="sliders-horizontal" />}
      />
    </Box>
  );
};

export { ManagedListDemo };
