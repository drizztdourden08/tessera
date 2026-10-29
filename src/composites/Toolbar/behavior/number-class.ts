/* @layer renderer-components @kind util */
import type { ToolbarNumber } from '../Toolbar.type';
import { numberColumns } from './number-columns';

const numberClass = (item: ToolbarNumber): string =>
  item.showLabel === true ? `toolbar__number toolbar__number--labelled toolbar__number--cols-${numberColumns(item)}` : 'toolbar__number';

export { numberClass };
