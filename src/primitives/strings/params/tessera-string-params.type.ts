/* @layer renderer-components @kind types */
import type { TesseraStrings } from '../tessera-strings.type';

type StringFunction = (...args: never[]) => string;

type GroupParams<G> = {
  readonly [K in keyof G as G[K] extends StringFunction ? K : never]: G[K] extends (...args: infer P) => string
    ? { readonly [I in keyof P]: string }
    : never;
};

type TesseraStringParams = {
  readonly [N in keyof TesseraStrings as keyof GroupParams<TesseraStrings[N]> extends never ? never : N]: GroupParams<TesseraStrings[N]>;
};

export type { TesseraStringParams };
