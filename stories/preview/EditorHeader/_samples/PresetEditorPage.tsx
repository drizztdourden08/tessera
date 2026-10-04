/* @layer stories @kind component */
import { ContentHeader } from '../../../../src/composites';
import { Box, Icon } from '../../../../src/primitives';
import { EditorBar } from '../EditorBar';
import { EditorContext } from '../sub-components/EditorContext';
import { EditorName } from '../sub-components/EditorName';
import { SaveState } from '../sub-components/SaveState';
import { EditorActions } from './EditorActions';
import { BACK_TO_PRESETS, PRESET_CONTEXT } from './editor-samples.constants';
import { EditorPageBody } from './EditorPageBody';
import type { PresetEditorPageProps } from './EditorOption.type';
import { useEditorDemo } from './useEditorDemo';
import '../../_shared/preview.css';

const ICON = <Icon name="sliders-horizontal" />;

const PresetEditorPage = ({ option, narrow = false }: PresetEditorPageProps) => {
  const demo = useEditorDemo('Keysanity');
  const actions = <EditorActions state={demo.state} onSave={demo.save} onReset={demo.reset} />;
  const page = narrow ? 'preview-page editor-story__page--narrow' : 'preview-page';
  if (option === 'header') {
    const title = <EditorName value={demo.name} onChange={demo.edit} error={demo.nameError} size="xl" />;
    const strip = <SaveState state={demo.state} error={demo.error} />;
    return (
      <Box className={page}>
        <ContentHeader back={BACK_TO_PRESETS} icon={ICON} title={title} strip={strip} actions={actions} />
        <EditorPageBody />
      </Box>
    );
  }
  if (option === 'foot') {
    return (
      <Box className={page}>
        <ContentHeader back={BACK_TO_PRESETS} icon={ICON} title={demo.name || 'Untitled'} strip={<EditorContext items={PRESET_CONTEXT} />} />
        <EditorPageBody withName={{ name: demo.name, onChange: demo.edit, error: demo.nameError }} />
        <EditorBar edge="foot" state={demo.state} error={demo.error} actions={actions} />
      </Box>
    );
  }
  return (
    <Box className={page}>
      <ContentHeader back={BACK_TO_PRESETS} icon={ICON} title="Edit preset" />
      <EditorBar name={demo.name} onNameChange={demo.edit} nameError={demo.nameError} context={PRESET_CONTEXT} state={demo.state} error={demo.error} actions={actions} />
      <EditorPageBody />
    </Box>
  );
};

export { PresetEditorPage };
