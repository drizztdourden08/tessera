/* @layer renderer-components @kind component */
import { useCallback, useState } from 'react';
import { HintReportContext } from '../hint/hint-report-context';
import { HintValueContext } from '../hint/hint-value-context';
import { nextHintEntries } from '../hint/next-hint-entries';
import type { Hint, HintEntry, HintScopeProps } from '../hint/hint.type';

const HintScope = (props: HintScopeProps) => {
  const { children } = props;
  const [entries, setEntries] = useState<readonly HintEntry[]>([]);
  const report = useCallback((source: string, hint: Hint | null) => {
    setEntries((previous) => nextHintEntries(previous, source, hint));
  }, []);
  const current = entries.at(-1)?.hint ?? null;

  return (
    <HintReportContext.Provider value={report}>
      <HintValueContext.Provider value={current}>{children}</HintValueContext.Provider>
    </HintReportContext.Provider>
  );
};

export { HintScope };
