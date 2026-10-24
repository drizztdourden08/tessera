/* @layer renderer-components @kind component */
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ItemListNameInputProps } from '../ItemList.type';

const ItemListNameInput = ({ edit, className, size, onBlur }: ItemListNameInputProps) => {
  const { lists } = useTesseraStrings();
  return (
    <TextInput
      className={className}
      size={size}
      aria-label={lists.newName}
      value={edit.draft}
      onChange={(event) => edit.setDraft(event.target.value)}
      onKeyDown={edit.onKeyDown}
      onBlur={onBlur}
      onFocus={(event) => event.target.select()}
      autoFocus
    />
  );
};

export { ItemListNameInput };
