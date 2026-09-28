/* @layer renderer-components @kind hook */
import { useState, useEffect, useCallback } from 'react';
import { HEX_RE } from './useHexInput.constants';

const useHexInput = (value: string, onChange: (hex: string) => void) => {
  const [hexInput, setHexInput] = useState(value.replace('#', ''));
  useEffect(() => setHexInput(value.replace('#', '')), [value]);

  const commitHex = useCallback((raw: string) => {
    setHexInput(raw);
    if (HEX_RE.test(raw)) onChange(`#${raw}`);
  }, [onChange]);

  return { hexInput, commitHex };
};

export { useHexInput };
