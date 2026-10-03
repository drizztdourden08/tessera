/* @layer root-config @kind data */
import type { ReviewOption } from './review-options.type';

const REVIEW_OPTIONS: readonly ReviewOption[] = [
  { status: 'new', colour: 'red', icon: 'circle-dashed', label: 'Not reviewed', changed: 'Not reviewed' },
  { status: 'seen', colour: 'yellow', icon: 'eye', label: 'Seen, feedback given', changed: 'Feedback given, and the files changed since' },
  { status: 'ok', colour: 'green', icon: 'circle-check', label: 'Approved', changed: 'Approved, but the files changed since. Click to approve again' },
];

const REVIEW_NOTE_ICONS = { add: 'message-square-plus', open: 'message-square-text' } as const;

const REVIEW_CONTROL_ID = 'tessera-review-control';

export { REVIEW_CONTROL_ID, REVIEW_NOTE_ICONS, REVIEW_OPTIONS };
