/* @layer renderer-components @kind util */
import { defineStatuses } from '../../../primitives/Status';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';

const checkStatuses = (items: TesseraStrings['items']) => defineStatuses({
  pass: { label: items.checkPassed, tone: 'success', icon: 'circle-check' },
  warn: { label: items.checkAdvice, tone: 'warning', icon: 'triangle-alert' },
  fail: { label: items.checkFailed, tone: 'danger', icon: 'circle-x' },
  pending: { label: items.checkChecking, tone: 'info', pulse: true },
  skip: { label: items.checkSkipped, tone: 'neutral', icon: 'circle' },
});

export { checkStatuses };
