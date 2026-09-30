/* @layer renderer-components @kind component */
import { useCallback, useMemo, useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { Text } from '../../primitives/Text';
import { Paragraph } from '../../primitives/text-elements';
import { getPath } from '../../data/schema/path';
import { DialogShell } from '../DialogShell';
import { EditorGroup, layoutGroups } from '../RecordEditor';
import { useCreateFormState } from './behavior/useCreateFormState';
import type { EditorBinding } from '../RecordEditor';
import { CANCEL, CREATE, CREATING, NO_FIELDS, NOT_DIRTY } from './CreateRecordDialog.constants';
import type { CreateRecordDialogProps } from './CreateRecordDialog.type';
import './CreateRecordDialog.css';

const CreateRecordDialog = (props: CreateRecordDialogProps) => {
  const {
    open, title, schema, config, initialRecord, requiredPaths,
    resolveIdRefOptions, resolveTagSuggestions, onCreateTag, resolveNumberBounds,
    onCreate, onCreated, onCancel,
  } = props;
  const {
    working, setValue, isComplete, saving, error, handleCreate,
  } = useCreateFormState({
    initialRecord, requiredPaths, open, onCreate,
  });
  const createRef = useRef<HTMLButtonElement>(null);

  const groups = useMemo(() => layoutGroups(schema, config), [schema, config]);
  const readValue = useCallback((path: string) => getPath(working, path), [working]);
  const readBounds = useCallback(
    (path: string) => resolveNumberBounds?.(path, working),
    [resolveNumberBounds, working],
  );

  const binding = useMemo<EditorBinding>(() => ({
    value: readValue,
    onChange: setValue,
    isDirty: NOT_DIRTY,
    disabled: saving,
    resolveIdRefOptions,
    resolveTagSuggestions,
    onCreateTag,
    bounds: readBounds,
  }), [readValue, setValue, saving, resolveIdRefOptions, resolveTagSuggestions, onCreateTag, readBounds]);

  const submit = useCallback(async () => {
    const id = await handleCreate();
    if (id) onCreated(id);
  }, [handleCreate, onCreated]);

  const actions = (
    <>
      <Button variant="tertiary" onClick={onCancel}>{CANCEL}</Button>
      <Button ref={createRef} variant="primary" disabled={!isComplete || saving} onClick={submit}>
        {saving ? CREATING : CREATE}
      </Button>
    </>
  );

  return (
    <DialogShell open={open} onClose={onCancel} title={title} actions={actions} initialFocusRef={createRef}>
      <Box className="create-record-dialog">
        {groups.length === 0 && <Text variant="caption" className="record-editor__empty">{NO_FIELDS}</Text>}
        {groups.map((group) => (
          <EditorGroup key={group.id} group={group} binding={binding} depth={0} />
        ))}
        {error != null && <Paragraph className="create-record-dialog__error">{error}</Paragraph>}
      </Box>
    </DialogShell>
  );
};

export { CreateRecordDialog };
