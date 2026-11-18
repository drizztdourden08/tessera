/* @layer renderer-components @kind hook */
import { useTesseraLocale } from '../TesseraProvider/behavior/useTesseraLocale';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import type { ValueFormats } from './format-value.type';

const useValueFormats = (): ValueFormats => {
  const { common } = useTesseraStrings();
  return { locale: useTesseraLocale(), yes: common.yes, no: common.no };
};

export { useValueFormats };
