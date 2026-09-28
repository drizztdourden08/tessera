/* @layer renderer-components @kind logic */
import { listeners } from './listeners';

const notify = (): void => {
  for (const listener of listeners) listener();
};

export { notify };
