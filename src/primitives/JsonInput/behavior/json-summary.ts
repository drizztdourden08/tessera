/* @layer renderer-components @kind logic */
import type { TesseraStrings } from '../../strings/tessera-strings.type';

const jsonSummary = ({ options }: TesseraStrings, value: unknown): string => {
  if (Array.isArray(value)) return options.jsonArray(value.length);
  if (typeof value === 'object' && value !== null) return options.jsonObject(Object.keys(value).length);
  return options.jsonValue;
};

export { jsonSummary };
