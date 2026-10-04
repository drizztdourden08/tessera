/* @layer stories @kind component */
import { Box, Paragraph } from '../../../../src/primitives';
import { EditorBar } from '../EditorBar';
import { BACK_TO_SESSIONS, SESSION_CONTEXT } from './editor-samples.constants';
import { SessionActions } from './SessionActions';
import { useEditorDemo } from './useEditorDemo';
import '../../_shared/preview.css';

const SessionBuilderPane = () => {
  const demo = useEditorDemo('Friday run', 'saved');
  return (
    <Box className="preview-page editor-story__page--pane">
      <EditorBar back={BACK_TO_SESSIONS} name={demo.name} onNameChange={demo.edit} context={SESSION_CONTEXT} state={demo.state} actions={<SessionActions onRun={demo.save} />} />
      <Box className="preview-page__body">
        <Paragraph tone="dim">The players table and the options sit here.</Paragraph>
      </Box>
    </Box>
  );
};

export { SessionBuilderPane };
