/* @layer stories @kind hook */
import { useEffect, useState } from 'react';
import { RETRY_MS } from './load-error-samples.constants';

const useRetryDemo = (startRetrying = false) => {
  const [retrying, setRetrying] = useState(startRetrying);
  useEffect(() => {
    if (!retrying || startRetrying) return undefined;
    const timer = window.setTimeout(() => setRetrying(false), RETRY_MS);
    return () => window.clearTimeout(timer);
  }, [retrying, startRetrying]);
  return { retrying, onRetry: () => setRetrying(true) };
};

export { useRetryDemo };
