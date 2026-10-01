/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useState } from 'react';
import { setPath } from '../../../data/schema/path';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { hasPathChanged } from './dirty-paths';
import { WHOLE_RECORD } from './useRecordEditorState.constants';
import type { RecordEditorStateParams } from './useRecordEditorState.type';

const useRecordEditorState = <T,>(params: RecordEditorStateParams<T>) => {
  const { record, onSave } = params;
  const [baseline, setBaseline] = useState<T>(record);
  const [working, setWorking] = useState<T>(record);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const { records } = useTesseraStrings();

  useEffect(() => {
    setBaseline(record);
    setWorking(record);
    setSaveError(null);
  }, [record]);

  const setValue = useCallback((path: string, value: unknown) => {
    setWorking((previous) => setPath(previous, path, value));
  }, []);

  const isPathDirty = useCallback(
    (path: string) => hasPathChanged(baseline, working, path),
    [baseline, working],
  );

  const revert = useCallback(() => {
    setWorking(baseline);
    setSaveError(null);
  }, [baseline]);

  const handleSave = useCallback(async () => {
    if (!onSave) return;
    setSaving(true);
    setSaveError(null);
    try {
      await onSave(working);
      setBaseline(working);
    } catch (error: unknown) {
      setSaveError(error instanceof Error ? error.message : records.saveFailed);
    } finally {
      setSaving(false);
    }
  }, [onSave, working, records]);

  return {
    working,
    isDirty: hasPathChanged(baseline, working, WHOLE_RECORD),
    isPathDirty,
    saving,
    saveError,
    setValue,
    revert,
    handleSave,
  };
};

export { useRecordEditorState };
