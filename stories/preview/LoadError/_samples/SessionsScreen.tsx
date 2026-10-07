/* @layer stories @kind component */
import { RetryButton, ScreenPage } from '../../../../src/composites';
import { ErrorFallbackView } from '../../../../src/primitives/ErrorBoundary/sub-components/ErrorFallbackView';
import { Box, Icon } from '../../../../src/primitives';
import { LoadError } from '../LoadError';
import { SESSIONS } from './load-error-samples.constants';
import type { PlaceSampleProps } from './place-sample.type';
import { useRetryDemo } from './useRetryDemo';

const SessionsScreen = ({ today = false, retrying }: PlaceSampleProps) => {
  const retry = useRetryDemo(retrying);
  return (
    <Box className="story-frame load-error-story__screen">
      <ScreenPage icon={<Icon name="layers" />} title={SESSIONS.title} backdrop={null} bodyClassName="load-error-story__screen-body">
        {today
          ? <ErrorFallbackView error={SESSIONS.raw} label={SESSIONS.sentence} reset={retry.onRetry} action={<RetryButton {...retry} />} />
          : <LoadError message={SESSIONS.sentence} error={SESSIONS.raw} {...retry} />}
      </ScreenPage>
    </Box>
  );
};

export { SessionsScreen };
