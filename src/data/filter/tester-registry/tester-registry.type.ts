/* @layer renderer-components @kind types */
interface FilterTestOptions {
  caseSensitive?: boolean;
}

interface FieldTester {
  test: (value: unknown, op: string, operand: unknown, options?: FilterTestOptions) => boolean;
}

export type { FieldTester, FilterTestOptions };
