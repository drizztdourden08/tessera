/* @layer stories @kind component */
import { Box, Card, Paragraph, Status } from '../../../../src/primitives';
import { LOAD_ERROR_CHOICES } from './load-error-story.constants';

const LoadErrorChoices = () => (
  <Box className="load-error-story__choices">
    {LOAD_ERROR_CHOICES.map((choice) => (
      <Card
        key={choice.name}
        title={choice.name}
        tone={choice.chosen ? 'success' : 'neutral'}
        actions={<Status tone={choice.chosen ? 'success' : undefined} variant="pill">{choice.chosen ? 'Recommended' : 'Considered'}</Status>}
      >
        <Paragraph tone="dim" className="load-error-story__why">{choice.why}</Paragraph>
      </Card>
    ))}
  </Box>
);

export { LoadErrorChoices };
