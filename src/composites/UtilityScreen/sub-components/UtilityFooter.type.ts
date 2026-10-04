/* @layer renderer-components @kind types */
import type { UtilityScreenAction, UtilityScreenReport } from '../UtilityScreen.type';

interface UtilityFooterProps {
  report?: UtilityScreenReport;
  actions: readonly UtilityScreenAction[];
}

export type { UtilityFooterProps };
