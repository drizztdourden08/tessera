/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import { getPath } from '../../../data/schema/path';
import type { IdRefOptionResolver } from '../../field-kits/registry.type';
import type { RecordReaderSources, RecordReaders } from './useRecordReaders.type';

const useRecordReaders = (working: unknown, sources: RecordReaderSources): RecordReaders => {
  const { resolveNumberBounds, resolveIdRefOptions } = sources;
  const readValue = useCallback((path: string) => getPath(working, path), [working]);
  const readBounds = useCallback((path: string) => resolveNumberBounds?.(path, working), [resolveNumberBounds, working]);
  const readIdRefOptions = useMemo<IdRefOptionResolver | undefined>(
    () => (resolveIdRefOptions ? (targetKind, field) => resolveIdRefOptions(targetKind, field, working) : undefined),
    [resolveIdRefOptions, working],
  );
  return { readValue, readBounds, readIdRefOptions };
};

export { useRecordReaders };
