/* @layer stories @kind util */
import { defineStatuses } from '../../../../src/primitives';
import { EDITOR_STRINGS } from '../editor-strings.constants';

const SAVE_STATUSES = defineStatuses({
  clean: { label: EDITOR_STRINGS.clean, tone: 'neutral' },
  dirty: { label: EDITOR_STRINGS.dirty, tone: 'warning' },
  saving: { label: EDITOR_STRINGS.saving, tone: 'info', pulse: true },
  saved: { label: EDITOR_STRINGS.saved, tone: 'success', icon: 'check' },
  error: { label: EDITOR_STRINGS.failed, tone: 'danger', icon: 'circle-x' },
});

export { SAVE_STATUSES };
