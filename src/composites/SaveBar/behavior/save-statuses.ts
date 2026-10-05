/* @layer renderer-components @kind util */
import { defineStatuses } from '../../../primitives/Status';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const saveStatuses = ({ saveBar, common }: TesseraStrings) => defineStatuses({
  clean: { label: saveBar.clean, tone: 'neutral' },
  dirty: { label: common.unsavedTitle, tone: 'warning' },
  saving: { label: saveBar.saving, tone: 'info', pulse: true },
  saved: { label: saveBar.saved, tone: 'success', icon: 'check' },
  error: { label: saveBar.failed, tone: 'danger', icon: 'circle-x' },
});

export { saveStatuses };
