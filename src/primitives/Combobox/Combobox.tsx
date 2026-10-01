/* @layer renderer-components @kind component */
import { listboxSetup } from '../listbox/listbox-setup';
import { ListboxPopup } from '../listbox/ListboxPopup';
import { useCombobox } from './behavior/useCombobox';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { ComboboxField } from './sub-components/ComboboxField';
import type { FieldOf } from '../listbox/listbox.type';
import type { ComboboxProps } from './Combobox.type';
import '../../theme/field-surface.css';
import '../../theme/listbox.css';
import '../../theme/listbox-drop.css';
import './Combobox.css';

const Combobox = <T = string, F extends FieldOf<T> = never>(props: ComboboxProps<T, F>) => {
  const { common } = useTesseraStrings();
  const setup = listboxSetup(props, common.noMatches);
  const box = useCombobox(setup, props, props.filter);

  return (
    <>
      <ComboboxField box={box} look={props} />
      <ListboxPopup
        drop={box.drop}
        view={box.view}
        invalid={box.field.invalid}
        size={box.field.size}
        loading={setup.loading}
        emptyText={setup.emptyText}
        labelledBy={box.field.labelledBy}
        label={props['aria-label']}
      />
    </>
  );
};

export { Combobox };
