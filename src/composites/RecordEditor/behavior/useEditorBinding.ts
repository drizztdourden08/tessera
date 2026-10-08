/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import { markedPaths } from './changed-paths';
import { useRecordReaders } from './useRecordReaders';
import type { EditorBinding } from '../RecordEditor.type';
import type { UseEditorBindingInput } from './useEditorBinding.type';

const useEditorBinding = (input: UseEditorBindingInput): EditorBinding => {
  const {
    working, setValue, isPathDirty, readOnly, changedPaths,
    resolveIdRefOptions, resolveTagSuggestions, onCreateTag, resolveNumberBounds,
  } = input;
  const { readValue, readBounds, readIdRefOptions } = useRecordReaders(working, { resolveNumberBounds, resolveIdRefOptions });

  const changed = useMemo(() => (changedPaths ? markedPaths(changedPaths) : null), [changedPaths]);
  const isChanged = useCallback((path: string) => changed?.has(path) ?? false, [changed]);

  return useMemo<EditorBinding>(
    () => ({
      value: readValue,
      onChange: setValue,
      isDirty: isPathDirty,
      isChanged: changed ? isChanged : undefined,
      disabled: readOnly,
      resolveIdRefOptions: readIdRefOptions,
      resolveTagSuggestions,
      onCreateTag,
      bounds: readBounds,
    }),
    [readValue, setValue, isPathDirty, changed, isChanged, readOnly, readIdRefOptions,
      resolveTagSuggestions, onCreateTag, readBounds],
  );
};

export { useEditorBinding };
