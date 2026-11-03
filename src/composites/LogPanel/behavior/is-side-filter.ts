/* @layer renderer-components @kind logic */
import type { LogFilterPlacement } from '../LogPanel.type';

const isSideFilter = (placement: LogFilterPlacement | undefined): boolean => placement === 'left' || placement === 'right';

export { isSideFilter };
