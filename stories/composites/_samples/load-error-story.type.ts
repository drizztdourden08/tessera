/* @layer stories @kind types */
import type { LoadErrorVariant } from '../../../src/composites';

type LoadErrorRaw = 'short' | 'long' | 'none';

type LoadErrorArgs = {
  variant: LoadErrorVariant;
  message: string;
  raw: LoadErrorRaw;
  retry: boolean;
  retrying: boolean;
  reveal: boolean;
};

interface LoadErrorSampleProps {
  retrying?: boolean;
}

export type { LoadErrorArgs, LoadErrorSampleProps };
