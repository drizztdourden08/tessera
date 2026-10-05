/* @layer stories @kind hook */
import { useEffect, useState } from 'react';
import { MAX_TRIES, RETRY_WAIT_MS, TRY_MS } from './connection-samples.constants';
import type { ConnectionPhase } from './ConnectionCard.type';

const useReconnectLoop = () => {
  const [phase, setPhase] = useState<ConnectionPhase>('reconnecting');
  const [attempt, setAttempt] = useState(1);
  const [retryAt, setRetryAt] = useState<number | null>(() => Date.now() + RETRY_WAIT_MS);
  const [trying, setTrying] = useState(false);
  useEffect(() => {
    if (retryAt === null || trying) return undefined;
    const timer = setTimeout(() => setTrying(true), Math.max(0, retryAt - Date.now()));
    return () => clearTimeout(timer);
  }, [retryAt, trying]);
  useEffect(() => {
    if (!trying) return undefined;
    const timer = setTimeout(() => {
      setTrying(false);
      const out = attempt >= MAX_TRIES;
      if (out) setPhase('failed');
      else setAttempt(attempt + 1);
      setRetryAt(out ? null : Date.now() + RETRY_WAIT_MS);
    }, TRY_MS);
    return () => clearTimeout(timer);
  }, [trying, attempt]);
  const retryNow = () => {
    setRetryAt(null);
    setPhase('connecting');
    setTimeout(() => setPhase('live'), TRY_MS);
  };
  const restart = () => {
    setPhase('reconnecting');
    setAttempt(1);
    setRetryAt(Date.now() + RETRY_WAIT_MS);
  };
  return { phase, attempt, retryAt, trying, retryNow, restart };
};

export { useReconnectLoop };
