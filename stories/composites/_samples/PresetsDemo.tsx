/* @layer stories @kind component */
import { useState } from 'react';
import { InlineCreateForm, ListDetail } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { presetGames } from './preset-games';
import { presetGroup } from './preset-group';
import { presetRow } from './preset-row';
import type { PresetsDemoProps, SamplePreset } from './preset-samples.type';
import { PresetEditor } from './PresetEditor';
import { usePresetDraft } from './usePresetDraft';
import { useSamplePresets } from './useSamplePresets';
import { useSaveDemo } from './useSaveDemo';

const idOf = (preset: SamplePreset) => preset.id;
const nameOf = (preset: SamplePreset) => preset.name;

const frameClass = ({ narrow, tall }: PresetsDemoProps): string =>
  ['list-detail-story', tall && 'list-detail-story--tall', narrow && 'list-detail-story--narrow'].filter(Boolean).join(' ');

const PresetsDemo = (props: PresetsDemoProps) => {
  const { guard, startDirty, startEmpty, startCollapsed, emptyGame } = props;
  const presets = useSamplePresets();
  const [selectedId, setSelectedId] = useState<string | null>(startEmpty ? null : 'p2');
  const edit = usePresetDraft(presets.items.find((p) => p.id === selectedId), startDirty === true);
  const saving = useSaveDemo(edit.dirty);
  const save = () => saving.run(() => {
    if (edit.draft) presets.save(edit.draft);
    edit.clear();
    return undefined;
  });
  const drop = () => {
    edit.clear();
    saving.reset();
  };
  const current = edit.draft;
  return (
    <Box className={frameClass(props)}>
      <ListDetail
        list={{
          title: 'Presets', items: presets.items, getId: idOf, getName: nameOf, render: presetRow, groupBy: presetGroup,
          onRename: presets.rename, onDelete: presets.remove, filter: true, createLabel: 'New preset',
          groups: emptyGame ? presetGames((game) => { drop(); setSelectedId(presets.create('New preset', game)); }) : undefined,
          create: (close) => (
            <InlineCreateForm placeholder="Preset name" onCreate={(name) => { drop(); setSelectedId(presets.create(name)); close(); }} onCancel={close} />
          ),
        }}
        selectedId={selectedId}
        onSelect={(id) => { drop(); setSelectedId(id); }}
        detail={current && (
          <PresetEditor preset={current} state={saving.state} onChange={(patch) => edit.setDraft({ ...current, ...patch })} onSave={() => void save()} onDiscard={drop} />
        )}
        dirty={edit.dirty}
        onSave={save}
        onDiscard={drop}
        guard={guard}
        defaultCollapsed={startCollapsed}
        listLabel="presets"
        detailLabel="preset editor"
      />
    </Box>
  );
};

export { PresetsDemo };
