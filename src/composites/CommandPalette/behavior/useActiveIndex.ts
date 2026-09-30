/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';

const useActiveIndex = (query: string, controlled: number | undefined, onChange: ((index: number) => void) | undefined) => {
  const [own, setOwn] = useState(0);

  useEffect(() => {
    setOwn(0);
  }, [query]);

  const setActive = (index: number) => {
    setOwn(index);
    onChange?.(index);
  };

  return { active: controlled ?? own, setActive };
};

export { useActiveIndex };
