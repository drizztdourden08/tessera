/* @layer renderer-components @kind component */
import { listboxSetup } from '../listbox/listbox-setup';
import { isOptionsProps } from './behavior/is-options-props';
import { optionsSetup } from './behavior/options-setup';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { SelectBody } from './sub-components/SelectBody';
import type { FieldOf } from '../listbox/listbox.type';
import type { SelectProps } from './Select.type';
import '../../theme/field-surface.css';
import '../../theme/listbox.css';
import '../../theme/listbox-drop.css';
import './Select.css';

const Select = <T = string, F extends FieldOf<T> = never>(props: SelectProps<T, F>) => {
  const { fields } = useTesseraStrings();
  return isOptionsProps(props)
    ? <SelectBody setup={optionsSetup(props, fields.noOptions)} look={props} />
    : <SelectBody setup={listboxSetup(props, fields.noOptions)} look={props} />;
};

export { Select };
