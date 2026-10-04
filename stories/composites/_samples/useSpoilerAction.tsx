/* @layer stories @kind hook */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { SpoilerAction } from './SpoilerAction';

type SpoilerSlot = { action: ReactNode; note: string };

const useSpoilerAction = (enabled: boolean): SpoilerSlot => {
  const [shown, setShown] = useState(false);
  if (!enabled) return { action: undefined, note: '' };
  return {
    action: <SpoilerAction shown={shown} onToggle={() => setShown(!shown)} />,
    note: ` · spoilers ${shown ? 'shown' : 'hidden'}`,
  };
};

export { useSpoilerAction };
