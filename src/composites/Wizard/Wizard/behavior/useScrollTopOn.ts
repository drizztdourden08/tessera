/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';

const useScrollTopOn = (key: string) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [key]);
  return ref;
};

export { useScrollTopOn };
