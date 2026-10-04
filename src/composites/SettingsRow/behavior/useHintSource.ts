/* @layer renderer-components @kind hook */
import { useCallback, useContext, useEffect, useId } from 'react';
import { HintReportContext } from '../../../primitives/hint/hint-report-context';
import type { HintReport } from '../../../primitives/hint/hint.type';

const useHintSource = (): HintReport => {
  const report = useContext(HintReportContext);
  const source = useId();
  useEffect(() => () => report?.(source, null), [report, source]);
  return useCallback((hint) => report?.(source, hint), [report, source]);
};

export { useHintSource };
