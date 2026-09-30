/* @layer renderer-components @kind util */
import { isRecord } from './is-record';
import { valueText } from './value-text';

const firstText = (item: unknown, fields: readonly string[]): string | undefined =>
  isRecord(item) ? fields.map((field) => valueText(item[field])).find((text) => text !== '') : undefined;

export { firstText };
