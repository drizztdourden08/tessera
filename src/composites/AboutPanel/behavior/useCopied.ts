/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useState } from 'react';
import { COPIED_MS } from '../AboutPanel.constants';
import type { AboutPanelCopy } from '../AboutPanel.type';
import { writeClipboard } from './write-clipboard';

const useCopied = (text: string | null, onCopy: AboutPanelCopy = writeClipboard) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = useCallback(async () => {
    if (text === null) return;
    if (await onCopy(text)) setCopied(true);
  }, [text, onCopy]);

  return { copied, handleCopy };
};

export { useCopied };
