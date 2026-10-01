/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { countLabel } from '../../field-kits/count-label';
import { AddItemButton } from '../../field-kits/sub-components/AddItemButton';
import type { ArrayEditorShellProps } from './ArrayEditorShell.type';
import '../../../theme/record-editor.css';

const ArrayEditorShell = (props: ArrayEditorShellProps) => {
  const { isEmpty, disabled, onAdd, children } = props;
  const { records } = useTesseraStrings();
  return (
    <Flex className="record-editor__array" direction="column" gap="sm">
      {isEmpty && <Text variant="caption" className="record-editor__empty">{countLabel(0, records)}</Text>}
      {children}
      <AddItemButton label={records.add} disabled={disabled} onAdd={onAdd} />
    </Flex>
  );
};

export { ArrayEditorShell };
