/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { DELETE, REVERT, SAVE, SAVING } from './EditorFooter.constants';
import type { EditorFooterProps } from './EditorFooter.type';

const EditorFooter = (props: EditorFooterProps) => {
  const { canSave, isDirty, saving, saveError, disabled, onRevert, onSave, onDelete } = props;
  if (!canSave && onDelete === undefined) return null;
  const locked = !isDirty || saving || disabled;

  return (
    <Flex className="record-editor__footer" gap="sm" align="center" justify="end">
      {saveError != null && (
        <Text as="p" className="record-editor__error">{saveError}</Text>
      )}
      {onDelete !== undefined && (
        <Button variant="danger" disabled={disabled} onClick={onDelete}>
          {DELETE}
        </Button>
      )}
      {canSave && (
        <>
          <Button variant="tertiary" disabled={locked} onClick={onRevert}>
            {REVERT}
          </Button>
          <Button variant="primary" disabled={locked} onClick={onSave}>
            {saving ? SAVING : SAVE}
          </Button>
        </>
      )}
    </Flex>
  );
};

export { EditorFooter };
