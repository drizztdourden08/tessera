/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useEditorBinding } from './behavior/useEditorBinding';
import { useRecordEditorState } from './behavior/useRecordEditorState';
import { layoutGroups } from './behavior/layout-groups';
import { EditorFooter } from './sub-components/EditorFooter';
import { EditorGroup } from './sub-components/EditorGroup';
import { ReferencedBy } from './sub-components/ReferencedBy';
import type { RecordEditorProps } from './RecordEditor.type';
import '../../theme/record-editor.css';

const RecordEditor = <T,>(props: RecordEditorProps<T>) => {
  const {
    record, schema, config, onSave, disabled = false, changedPaths,
    resolveIdRefOptions, resolveTagSuggestions, onCreateTag, resolveNumberBounds,
    referencedBy, onDelete,
  } = props;
  const { working, isDirty, isPathDirty, saving, saveError, setValue, revert, handleSave } =
    useRecordEditorState({ record, onSave });
  const { records } = useTesseraStrings();

  const groups = useMemo(() => layoutGroups(schema, records, config), [schema, records, config]);
  const binding = useEditorBinding({
    working, setValue, isPathDirty, readOnly: onSave === undefined || disabled, changedPaths,
    resolveIdRefOptions, resolveTagSuggestions, onCreateTag, resolveNumberBounds,
  });

  return (
    <Box className="record-editor">
      {groups.length === 0 && <Text variant="caption" className="record-editor__empty">{records.noFieldsToShow}</Text>}
      {groups.map((group) => (
        <EditorGroup key={group.id} group={group} binding={binding} depth={0} />
      ))}
      {referencedBy !== undefined && <ReferencedBy hits={referencedBy} />}
      <EditorFooter
        canSave={onSave !== undefined}
        isDirty={isDirty}
        saving={saving}
        saveError={saveError}
        disabled={disabled}
        onRevert={revert}
        onSave={handleSave}
        onDelete={onDelete}
      />
    </Box>
  );
};

export { RecordEditor };
