/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import { getPath } from '../../../data/schema/path';
import { markedPaths } from './changed-paths';
import type { EditorBinding } from '../RecordEditor.type';
import type { UseEditorBindingInput } from './useEditorBinding.type';

const useEditorBinding = (input: UseEditorBindingInput): EditorBinding => {
  const {
    working, setValue, isPathDirty, readOnly, changedPaths,
    resolveIdRefOptions, resolveTagSuggestions, onCreateTag, resolveNumberBounds,
  } = input;

  const readValue = useCallback((path: string) => getPath(working, path), [working]);

  const readBounds = useCallback(
    (path: string) => resolveNumberBounds?.(path, working),
    [resolveNumberBounds, working],
  );

  const changed = useMemo(() => (changedPaths ? markedPaths(changedPaths) : null), [changedPaths]);
  const isChanged = useCallback((path: string) => changed?.has(path) ?? false, [changed]);

  return useMemo<EditorBinding>(
    () => ({
      value: readValue,
      onChange: setValue,
      isDirty: isPathDirty,
      isChanged: changed ? isChanged : undefined,
      disabled: readOnly,
      resolveIdRefOptions,
      resolveTagSuggestions,
      onCreateTag,
      bounds: readBounds,
    }),
    [readValue, setValue, isPathDirty, changed, isChanged, readOnly, resolveIdRefOptions,
      resolveTagSuggestions, onCreateTag, readBounds],
  );
};

export { useEditorBinding };
