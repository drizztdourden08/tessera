/* @layer stories @kind data */
import type { UtilityScreenStatus } from '../../../src/composites';

type UpdateStep = 'checking' | 'available' | 'downloading' | 'current' | 'failed';

const UPDATE_STEPS: readonly UpdateStep[] = ['checking', 'available', 'downloading', 'current', 'failed'];

const UPDATE_STEP_LABEL: Readonly<Record<UpdateStep, string>> = {
  checking: 'Checking', available: 'Available', downloading: 'Downloading', current: 'Up to date', failed: 'Failed',
};

const UPDATE_STATUS: Readonly<Record<UpdateStep, UtilityScreenStatus>> = {
  checking: { tone: 'busy', title: 'Checking for a newer version', message: 'This takes a few seconds.' },
  available: { tone: 'info', title: 'Version 0.10.0 is ready', message: 'You have 0.9.2. The update keeps your profiles and settings.' },
  downloading: { tone: 'busy', title: 'Downloading 0.10.0', message: 'The app restarts once the download ends.' },
  current: { tone: 'success', title: 'You are up to date', message: 'Version 0.9.2 is the newest one.' },
  failed: { tone: 'danger', title: 'The check failed', message: 'The update server did not answer. Check your connection, then try again.' },
};

export { UPDATE_STATUS, UPDATE_STEP_LABEL, UPDATE_STEPS };
export type { UpdateStep };
