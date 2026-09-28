/* @layer renderer-components @kind logic */
import { comparators } from './comparators';
import { groupKeys } from './group-keys';

const clearFieldStrategies = (): void => {
  comparators.clear();
  groupKeys.clear();
};

export { clearFieldStrategies };
