/* @layer stories @kind component */
import { useState } from 'react';
import { MasterDetail } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { presetGroup } from './preset-group';
import { presetRow } from './preset-row';
import type { PresetsDemoProps, SamplePreset } from './preset-samples.type';
import { PresetEditor } from './PresetEditor';
import { usePresetDraft } from './usePresetDraft';
import { useSamplePresets } from './useSamplePresets';

const idOf = (preset: SamplePreset) => preset.id;
const nameOf = (preset: SamplePreset) => preset.name;

const PresetsDemo = ({ guard, narrow, startDirty, startEmpty }: PresetsDemoProps) => {
  const presets = useSamplePresets();
  const [selectedId, setSelectedId] = useState<string | null>(startEmpty ? null : 'p2');
  const edit = usePresetDraft(presets.items.find((p) => p.id === selectedId), startDirty === true);
  const save = () => {
    if (edit.draft) presets.save(edit.draft);
    edit.clear();
  };
  const current = edit.draft;
  return (
    <Box className={narrow ? 'master-detail-editor-story master-detail-editor-story--narrow' : 'master-detail-editor-story'}>
      <MasterDetail
        list={{
          title: 'Presets', items: presets.items, getId: idOf, getName: nameOf, render: presetRow, groupBy: presetGroup,
          onCreate: () => setSelectedId(presets.create()), onRename: presets.rename, onDelete: presets.remove, filter: true,
        }}
        selectedId={selectedId}
        onSelect={(id) => { edit.clear(); setSelectedId(id); }}
        detail={current && <PresetEditor preset={current} dirty={edit.dirty} onChange={(patch) => edit.setDraft({ ...current, ...patch })} onSave={save} />}
        dirty={edit.dirty}
        onSave={save}
        onDiscard={edit.clear}
        guard={guard}
        storageKey="tessera-stories:master-detail-editor-width"
        listLabel="presets"
        detailLabel="preset editor"
      />
    </Box>
  );
};

export { PresetsDemo };
