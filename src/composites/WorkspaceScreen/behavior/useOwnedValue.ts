/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';

const useOwnedValue = <T,>(given: T | undefined, initial: T, onChange?: (value: T) => void) => {
  const [own, setOwn] = useState(initial);
  const value = given ?? own;
  const set = useCallback((next: T) => {
    setOwn(next);
    onChange?.(next);
  }, [onChange]);
  return { value, set };
};

export { useOwnedValue };
