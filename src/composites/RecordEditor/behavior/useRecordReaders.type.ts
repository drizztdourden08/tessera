/* @layer renderer-components @kind types */
import type { IdRefOptionResolver, NumberBounds } from '../../field-kits/registry.type';
import type { NumberBoundsResolver } from '../RecordEditor.type';

interface RecordReaders {
  readValue: (path: string) => unknown;
  readBounds: (path: string) => NumberBounds | undefined;
  readIdRefOptions?: IdRefOptionResolver;
}

interface RecordReaderSources {
  resolveNumberBounds?: NumberBoundsResolver;
  resolveIdRefOptions?: IdRefOptionResolver;
}

export type { RecordReaders, RecordReaderSources };
