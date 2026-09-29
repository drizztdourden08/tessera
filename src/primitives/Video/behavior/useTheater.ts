/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { TheaterParams } from '../Video.type';

const useTheater = (params: TheaterParams) => {
  const { theater, defaultTheater, onTheaterChange } = params;
  const [own, setOwn] = useState(defaultTheater);
  const active = theater ?? own;

  const toggle = useCallback(() => {
    const next = !active;
    if (theater === undefined) setOwn(next);
    onTheaterChange?.(next);
  }, [active, theater, onTheaterChange]);

  return { active, toggle };
};

export { useTheater };
