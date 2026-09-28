/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { countLabel } from '../../field-kits/countLabel';
import { AddItemButton } from '../../field-kits/sub-components/AddItemButton';
import { ADD } from './ArrayEditorShell.constants';
import type { ArrayEditorShellProps } from './ArrayEditorShell.type';
import '../../../theme/record-editor.css';

const ArrayEditorShell = (props: ArrayEditorShellProps) => {
  const { isEmpty, disabled, onAdd, children } = props;
  return (
    <Flex className="record-editor__array" direction="column" gap="sm">
      {isEmpty && <Text className="record-editor__empty">{countLabel(0)}</Text>}
      {children}
      <AddItemButton label={ADD} disabled={disabled} onAdd={onAdd} />
    </Flex>
  );
};

export { ArrayEditorShell };
