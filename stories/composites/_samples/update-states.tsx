/* @layer stories @kind data */
import type { UtilityScreenStatus } from '../../../src/composites';
import { Icon, Strong } from '../../../src/primitives';

type UpdateStep = 'checking' | 'available' | 'downloading' | 'current' | 'failed';

const UPDATE_STEPS: readonly UpdateStep[] = ['checking', 'available', 'downloading', 'current', 'failed'];

const UPDATE_STEP_LABEL: Readonly<Record<UpdateStep, string>> = {
  checking: 'Checking', available: 'Available', downloading: 'Downloading', current: 'Up to date', failed: 'Failed',
};

const UPDATE_STATUS: Readonly<Record<UpdateStep, UtilityScreenStatus>> = {
  checking: { tone: 'busy', title: 'Checking for updates', message: 'Looking for a newer version. This takes a few seconds.' },
  available: { tone: 'info', icon: <Icon name="download" />, title: 'Update available', message: <>Version <Strong>0.10.0</Strong> is available</> },
  downloading: { tone: 'busy', title: 'Downloading 0.10.0', message: 'The app closes and starts again on the new version once the download ends.' },
  current: { tone: 'success', title: 'Up to date', message: <>Version <Strong>0.9.2</Strong> is the latest</> },
  failed: { tone: 'danger', title: 'The update failed', message: 'The update server did not answer. Check your connection, then try again.' },
};

export { UPDATE_STATUS, UPDATE_STEP_LABEL, UPDATE_STEPS };
export type { UpdateStep };
