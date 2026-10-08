/* @layer stories @kind component */
import { LoadError, ScreenPage } from '../../../src/composites';
import { Box, Icon } from '../../../src/primitives';
import { SESSIONS } from './load-error-samples.constants';
import type { LoadErrorSampleProps } from './load-error-story.type';
import { useRetryDemo } from './useRetryDemo';

const SessionsScreen = ({ retrying }: LoadErrorSampleProps) => {
  const retry = useRetryDemo(retrying);
  return (
    <Box className="story-frame load-error-story__screen">
      <ScreenPage icon={<Icon name="layers" />} title={SESSIONS.title} backdrop={null} bodyClassName="load-error-story__screen-body">
        <LoadError message={SESSIONS.sentence} error={SESSIONS.raw} {...retry} />
      </ScreenPage>
    </Box>
  );
};

export { SessionsScreen };
