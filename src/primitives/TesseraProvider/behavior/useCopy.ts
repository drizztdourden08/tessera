/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useState } from 'react';
import { useTesseraOverride } from './useTesseraOverride';
import { writeClipboard } from './write-clipboard';
import { COPIED_MS } from './useCopy.constants';

const useCopy = () => {
  const writeText = useTesseraOverride('writeText') ?? writeClipboard;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await writeText(text);
      setCopied(true);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, [writeText]);

  return { copied, copy };
};

export { useCopy };
