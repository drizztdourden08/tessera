/* @layer renderer-components @kind logic */
import type { VirtualAxis } from '../../virtual';
import type { ListBodyProps } from './list-body-props.type';

const listBodyProps = (choosing: boolean, orientation: VirtualAxis): ListBodyProps =>
  choosing ? { role: 'listbox', 'aria-multiselectable': true, 'aria-orientation': orientation } : { role: 'list' };

export { listBodyProps };
