/* @layer renderer-components @kind logic */
import type { LoadGuard } from './durable-load.type';

const createLoadGuard = (): LoadGuard => {
  let generation = 0;
  let edited = false;

  const begin = (): number => {
    generation += 1;
    edited = false;
    return generation;
  };

  return {
    begin,
    cancel: () => { generation += 1; },
    markEdited: () => { edited = true; },
    mayApply: (token: number) => token === generation && !edited,
  };
};

export { createLoadGuard };
