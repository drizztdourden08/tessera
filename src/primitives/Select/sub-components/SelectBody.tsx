/* @layer renderer-components @kind component */
import { ListboxPopup } from '../../listbox/ListboxPopup';
import { useSelect } from '../behavior/useSelect';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { SelectSearch } from './SelectSearch';
import { SelectTrigger } from './SelectTrigger';
import type { SelectBodyProps } from './SelectBody.type';

const SelectBody = <T, V>(props: SelectBodyProps<T, V>) => {
  const { setup, look } = props;
  const select = useSelect(setup, look);
  const { common } = useTesseraStrings();

  return (
    <>
      <SelectTrigger select={select} setup={setup} look={look} />
      <ListboxPopup
        drop={select.drop}
        view={select.view}
        invalid={select.field.invalid}
        size={select.field.size}
        loading={setup.loading}
        emptyText={select.search === '' ? setup.emptyText : common.noMatches}
        labelledBy={select.field.labelledBy}
        label={look['aria-label']}
        header={look.searchable === true ? <SelectSearch select={select} /> : null}
      />
    </>
  );
};

export { SelectBody };
