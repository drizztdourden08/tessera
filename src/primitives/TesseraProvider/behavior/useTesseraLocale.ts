/* @layer renderer-components @kind hook */
import { useContext } from 'react';
import { TesseraOverridesContext } from './tessera-overrides-context';

const useTesseraLocale = (): string | undefined => {
  const { locale, strings } = useContext(TesseraOverridesContext);
  return locale ?? strings.dates.locale;
};

export { useTesseraLocale };
