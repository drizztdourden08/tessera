/* @layer renderer-components @kind hook */
import { useEffect, useRef, useState } from 'react';
import { ANNOUNCE_DELAY_MS } from '../PasswordInput.constants';
import type { CheckSnapshot } from './checks.type';

const useSettledAnnouncement = (snapshot: CheckSnapshot, settleKey: string, describe: (before: CheckSnapshot, after: CheckSnapshot) => string): string => {
  const [spoken, setSpoken] = useState('');
  const heard = useRef(snapshot);

  useEffect(() => {
    const timer = setTimeout(() => {
      const text = describe(heard.current, snapshot);
      heard.current = snapshot;
      if (text !== '') setSpoken(text);
    }, ANNOUNCE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [settleKey, snapshot.met.join(' '), snapshot.level]);

  return spoken;
};

export { useSettledAnnouncement };
