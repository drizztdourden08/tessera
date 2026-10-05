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
import { useSaveDemo } from './useSaveDemo';

const idOf = (preset: SamplePreset) => preset.id;
const nameOf = (preset: SamplePreset) => preset.name;

const PresetsDemo = ({ guard, narrow, startDirty, startEmpty }: PresetsDemoProps) => {
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
    <Box className={narrow ? 'master-detail-editor-story master-detail-editor-story--narrow' : 'master-detail-editor-story'}>
      <MasterDetail
        list={{
          title: 'Presets', items: presets.items, getId: idOf, getName: nameOf, render: presetRow, groupBy: presetGroup,
          onCreate: () => setSelectedId(presets.create()), onRename: presets.rename, onDelete: presets.remove, filter: true,
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
        storageKey="tessera-stories:master-detail-editor-width"
        listLabel="presets"
        detailLabel="preset editor"
      />
    </Box>
  );
};

export { PresetsDemo };
