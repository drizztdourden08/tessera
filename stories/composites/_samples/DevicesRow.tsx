/* @layer stories @kind component */
import { SettingsRow, SettingsSection } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { DEVICES } from './load-error-samples.constants';
import type { LoadErrorSampleProps } from './load-error-story.type';
import { useRetryDemo } from './useRetryDemo';

const DevicesRow = ({ retrying }: LoadErrorSampleProps) => {
  const retry = useRetryDemo(retrying);
  return (
    <Box className="load-error-story__row">
      <SettingsSection>
        <SettingsRow
          id="output-device"
          title={DEVICES.title}
          hint={DEVICES.description}
          noDescription
          problem={{ message: DEVICES.sentence, error: DEVICES.raw, ...retry }}
        />
      </SettingsSection>
    </Box>
  );
};

export { DevicesRow };
