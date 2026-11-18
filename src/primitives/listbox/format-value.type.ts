/* @layer renderer-components @kind types */
interface ValueFormats {
  locale: string | undefined;
  yes: string;
  no: string;
}

type ValueFormatter = (value: unknown, formats: ValueFormats) => string;

export type { ValueFormats, ValueFormatter };
