/* @layer stories @kind component */
import { ContentHeader } from '../../../../src/composites';
import { Box, Icon, SectionHeader } from '../../../../src/primitives';
import { EditorBar } from '../../EditorHeader/EditorBar';
import { SessionActions } from '../../EditorHeader/_samples/SessionActions';
import { useEditorDemo } from '../../EditorHeader/_samples/useEditorDemo';
import '../../_shared/preview.css';
import { PlayersGrid } from './PlayersGrid';

const BACK = { label: 'Sessions', onSelect: () => undefined };

const SessionBuilderPage = () => {
  const demo = useEditorDemo('Friday run', 'saved');
  return (
    <Box className="preview-page">
      <ContentHeader back={BACK} icon={<Icon name="layers" />} title="Edit session" />
      <EditorBar name={demo.name} onNameChange={demo.edit} context={['Archipelago 0.6', 'Async']} state={demo.state} actions={<SessionActions />} />
      <Box className="preview-page__body">
        <SectionHeader title="Players" />
        <PlayersGrid />
      </Box>
    </Box>
  );
};

export { SessionBuilderPage };
