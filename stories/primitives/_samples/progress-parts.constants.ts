/* @layer stories @kind data */
import type { ProgressPart } from '../../../src/primitives';

const PROGRESS_PARTS: Readonly<Record<'checks' | 'storage' | 'over', readonly ProgressPart[]>> = {
  checks: [
    { value: 120, label: 'Found', tone: 'success' },
    { value: 12, label: 'Hinted', tone: 'info' },
    { value: 4, label: 'Missed', tone: 'danger' },
  ],
  storage: [
    { value: 38, label: 'Games', color: 'var(--c-tag-teal)' },
    { value: 14, label: 'Saves', color: 'var(--c-tag-violet)' },
    { value: 9, label: 'Cache', color: 'var(--c-tag-amber)' },
  ],
  over: [
    { value: 60, label: 'Copied', tone: 'primary' },
    { value: 30, label: 'Verified', tone: 'secondary' },
    { value: 30, label: 'Queued', tone: 'tertiary' },
  ],
};

export { PROGRESS_PARTS };
