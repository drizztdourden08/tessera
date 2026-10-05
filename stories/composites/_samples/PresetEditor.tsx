/* @layer stories @kind component */
import { SaveBar } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import type { PresetEditorProps } from './preset-samples.type';
import { PresetEditorHead } from './PresetEditorHead';
import { PresetGeneralRows } from './PresetGeneralRows';
import { PresetGoalRows } from './PresetGoalRows';
import { PresetItemRows } from './PresetItemRows';
import './PresetEditor.css';

const PresetEditor = ({ preset, state, error, onChange, onSave, onDiscard }: PresetEditorProps) => (
  <Box className="preset-editor">
    <PresetEditorHead preset={preset} />
    <PresetGeneralRows preset={preset} onChange={onChange} />
    <PresetGoalRows preset={preset} onChange={onChange} />
    <PresetItemRows preset={preset} onChange={onChange} />
    <SaveBar className="preset-editor__bar" state={state} error={error} onSave={onSave} onDiscard={onDiscard} />
  </Box>
);

export { PresetEditor };
