/* @layer renderer-components @kind component */
import { listboxSetup } from '../listbox/listbox-setup';
import { isOptionsProps } from './behavior/is-options-props';
import { optionsSetup } from './behavior/options-setup';
import { NO_OPTIONS } from './Select.constants';
import { SelectBody } from './sub-components/SelectBody';
import type { FieldOf } from '../listbox/listbox.type';
import type { SelectProps } from './Select.type';
import '../../theme/field-surface.css';
import '../../theme/listbox.css';
import '../../theme/listbox-drop.css';
import '../../theme/tag-chip.css';
import './Select.css';

const Select = <T = string, F extends FieldOf<T> = never>(props: SelectProps<T, F>) => (
  isOptionsProps(props)
    ? <SelectBody setup={optionsSetup(props)} look={props} />
    : <SelectBody setup={listboxSetup(props, NO_OPTIONS)} look={props} />
);

export { Select };
