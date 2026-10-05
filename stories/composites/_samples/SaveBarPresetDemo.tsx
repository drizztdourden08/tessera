/* @layer stories @kind component */
import { useState } from 'react';
import { Box } from '../../../src/primitives';
import { PRESETS } from './preset-samples.constants';
import type { SamplePreset } from './preset-samples.type';
import { PresetEditor } from './PresetEditor';
import { useSaveDemo } from './useSaveDemo';

const START = PRESETS[0] as SamplePreset;

const NO_TOWER = 'The tower needs at least one crystal. Raise it and save again.';

const SaveBarPresetDemo = () => {
  const [saved, setSaved] = useState(START);
  const [draft, setDraft] = useState(START);
  const saving = useSaveDemo(JSON.stringify(draft) !== JSON.stringify(saved));
  const save = () => void saving.run(() => {
    if (draft.tower === 0) return NO_TOWER;
    setSaved(draft);
    return undefined;
  });
  const change = (patch: Partial<SamplePreset>) => {
    saving.reset();
    setDraft({ ...draft, ...patch });
  };
  return (
    <Box className="save-bar-story">
      <PresetEditor
        preset={draft}
        state={saving.state}
        error={saving.state === 'error' ? NO_TOWER : undefined}
        onChange={change}
        onSave={save}
        onDiscard={() => change(saved)}
      />
    </Box>
  );
};

export { SaveBarPresetDemo };
