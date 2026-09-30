/* @layer renderer-components @kind types */
import type { ComponentType, ReactNode } from 'react';
import type { SpinnerProps } from '../Spinner/Spinner.type';

interface TesseraOverrides {
  spinner?: ComponentType<SpinnerProps>;
}

type TesseraPart = keyof TesseraOverrides;

interface TesseraProviderProps {
  overrides: TesseraOverrides;
  children?: ReactNode;
}

export type { TesseraOverrides, TesseraPart, TesseraProviderProps };
