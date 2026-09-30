/* @layer renderer-components @kind component */
import { useContext, useMemo } from 'react';
import { TesseraOverridesContext } from './behavior/tessera-overrides-context';
import type { TesseraProviderProps } from './TesseraProvider.type';

const TesseraProvider = (props: TesseraProviderProps) => {
  const { overrides, children } = props;
  const inherited = useContext(TesseraOverridesContext);
  const merged = useMemo(() => ({ ...inherited, ...overrides }), [inherited, overrides]);

  return <TesseraOverridesContext value={merged}>{children}</TesseraOverridesContext>;
};

export { TesseraProvider };
