/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { TesseraOverrides, TesseraPart } from '../../../src/primitives';

type ProviderMode = 'tessera' | 'app';

interface ProviderPartProps {
  part: TesseraPart;
  app?: (report: (line: string) => void) => TesseraOverrides;
  reports?: boolean;
  children?: ReactNode;
}

export type { ProviderMode, ProviderPartProps };
