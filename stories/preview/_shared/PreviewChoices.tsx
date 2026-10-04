/* @layer stories @kind component */
import { Box, Card, Paragraph, Status } from '../../../src/primitives';
import type { PreviewChoicesProps } from './preview-shared.type';
import './preview.css';

const PreviewChoices = ({ choices }: PreviewChoicesProps) => (
  <Box className="preview-choices">
    {choices.map((choice) => (
      <Card
        key={choice.name}
        title={choice.name}
        tone={choice.chosen ? 'success' : 'neutral'}
        actions={choice.chosen ? <Status tone="success" variant="pill">Chosen</Status> : <Status variant="pill">Considered</Status>}
      >
        <Paragraph tone="dim" className="preview-choices__why">{choice.why}</Paragraph>
      </Card>
    ))}
  </Box>
);

export { PreviewChoices };
