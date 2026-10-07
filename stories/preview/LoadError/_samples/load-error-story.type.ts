/* @layer stories @kind types */
import type { LoadErrorVariant } from '../LoadError.type';

type LoadErrorRaw = 'short' | 'long' | 'none';

type LoadErrorArgs = {
  variant: LoadErrorVariant;
  message: string;
  raw: LoadErrorRaw;
  retry: boolean;
  retrying: boolean;
};

interface LoadErrorChoice {
  name: string;
  chosen?: boolean;
  why: string;
}

interface LoadErrorPlace {
  place: string;
  change: string;
}

export type { LoadErrorArgs, LoadErrorChoice, LoadErrorPlace };
