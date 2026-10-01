/* @layer renderer-components @kind hook */
import { useState } from 'react';

const useSliderValue = <T>(given: T | undefined, initial: T, onChange?: (value: T) => void): [T, (value: T) => void] => {
  const [own, setOwn] = useState<T>(initial);
  const controlled = given !== undefined;
  const set = (next: T) => {
    if (!controlled) setOwn(next);
    onChange?.(next);
  };
  return [controlled ? given : own, set];
};

export { useSliderValue };
