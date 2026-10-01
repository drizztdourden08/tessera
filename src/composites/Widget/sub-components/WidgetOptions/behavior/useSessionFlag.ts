/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import { readSessionFlag } from './read-session-flag';
import { writeSessionFlag } from './write-session-flag';
import type { SessionFlag } from './useSessionFlag.type';

const useSessionFlag = (key: string): SessionFlag => {
  const [on, setOn] = useState(() => readSessionFlag(key));
  const toggle = useCallback(() => {
    writeSessionFlag(key, !on);
    setOn(!on);
  }, [key, on]);
  return { on, toggle };
};

export { useSessionFlag };
