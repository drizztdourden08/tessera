/* @layer stories @kind component */
import { SettingsRow, SettingsSection } from '../../../../src/composites';
import type { SettingsInput } from '../../../../src/composites';
import { Box } from '../../../../src/primitives';
import { LoadError } from '../LoadError';
import { DEVICES } from './load-error-samples.constants';
import type { PlaceSampleProps } from './place-sample.type';
import { useRetryDemo } from './useRetryDemo';

const ignore = () => undefined;

const EMPTY_SELECT: SettingsInput = { kind: 'select', value: '', options: [], onChange: ignore };

const DevicesRow = ({ today = false, retrying }: PlaceSampleProps) => {
  const retry = useRetryDemo(retrying);
  const input: SettingsInput = today
    ? EMPTY_SELECT
    : { kind: 'custom', control: <LoadError variant="inline" message={DEVICES.sentence} error={DEVICES.raw} {...retry} /> };
  return (
    <Box className="load-error-story__row">
      <SettingsSection>
        <SettingsRow
          id="output-device"
          title={DEVICES.title}
          hint={DEVICES.description}
          noDescription
          input={input}
          problem={today ? DEVICES.raw : undefined}
        />
      </SettingsSection>
    </Box>
  );
};

export { DevicesRow };
