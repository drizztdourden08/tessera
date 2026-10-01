/* @layer renderer-components @kind component */
import { Text } from '../../../primitives/Text';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { HeaderLabelProps } from './HeaderLabel.type';

const HeaderLabel = ({ label, draft, onDraft, onKeyDown, onCommit }: HeaderLabelProps) => {
  const { table } = useTesseraStrings();
  if (draft === null) {
    return <Text variant="label" className="data-table__header-label" data-column-label="">{label}</Text>;
  }
  return (
    <TextInput
      autoFocus
      value={draft}
      className="data-table__rename"
      aria-label={table.renameNamed(label)}
      onChange={(event) => onDraft(event.target.value)}
      onKeyDown={onKeyDown}
      onBlur={onCommit}
    />
  );
};

export { HeaderLabel };
