/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Paragraph } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { EditorFooterProps } from './EditorFooter.type';

const EditorFooter = (props: EditorFooterProps) => {
  const { canSave, isDirty, saving, saveError, disabled, onRevert, onSave, onDelete } = props;
  const { common, records } = useTesseraStrings();
  if (!canSave && onDelete === undefined) return null;
  const locked = !isDirty || saving || disabled;

  return (
    <Flex className="record-editor__footer" gap="sm" align="center" justify="end">
      {saveError != null && (
        <Paragraph className="record-editor__error">{saveError}</Paragraph>
      )}
      {onDelete !== undefined && (
        <Button variant="danger" disabled={disabled} onClick={onDelete}>
          {common.delete}
        </Button>
      )}
      {canSave && (
        <>
          <Button variant="tertiary" disabled={locked} onClick={onRevert}>
            {records.revert}
          </Button>
          <Button variant="primary" disabled={!isDirty || disabled} loading={saving} onClick={onSave}>
            {common.save}
          </Button>
        </>
      )}
    </Flex>
  );
};

export { EditorFooter };
