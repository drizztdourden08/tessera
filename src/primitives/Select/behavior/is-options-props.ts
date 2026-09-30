/* @layer renderer-components @kind util */
import type { FieldOf } from '../../listbox/listbox.type';
import type { SelectOptionsProps, SelectProps } from '../Select.type';

const isOptionsProps = <T, F extends FieldOf<T>>(props: SelectProps<T, F>): props is SelectOptionsProps =>
  props.items === undefined;

export { isOptionsProps };
