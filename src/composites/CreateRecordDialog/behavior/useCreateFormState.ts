/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useState } from 'react';
import { getPath, setPath } from '../../../data/schema/path';
import type { CreateFormStateParams } from './useCreateFormState.type';

const isFilled = (value: unknown): boolean => {
  if (value === undefined || value === null) return false;
  return !(typeof value === 'string' && value.trim() === '');
};

const useCreateFormState = <T,>(params: CreateFormStateParams<T>) => {
  const { initialRecord, requiredPaths, open, onCreate } = params;
  const [working, setWorking] = useState<T>(initialRecord);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setWorking(initialRecord);
    setError(null);
  }, [open]);

  const setValue = useCallback((path: string, value: unknown) => {
    setWorking((previous) => setPath(previous, path, value));
  }, []);

  const isComplete = requiredPaths.every((path) => isFilled(getPath(working, path)));

  const handleCreate = useCallback(async (): Promise<string | null> => {
    setSaving(true);
    setError(null);
    try {
      const result = await onCreate(working);
      if (!result.success) {
        setError(result.error);
        return null;
      }
      return result.id;
    } catch (thrown: unknown) {
      setError(thrown instanceof Error ? thrown.message : 'Create failed');
      return null;
    } finally {
      setSaving(false);
    }
  }, [onCreate, working]);

  return {
    working, setValue, isComplete, saving, error, handleCreate,
  };
};

export { useCreateFormState };
