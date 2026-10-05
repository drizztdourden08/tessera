/* @layer renderer-components @kind logic */
import { changeRows } from './change-rows';

const bandOf = (row: number, height: number): number =>
  changeRows(height).filter((edge) => edge <= row).length;

export { bandOf };
