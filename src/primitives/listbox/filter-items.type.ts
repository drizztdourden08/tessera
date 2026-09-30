/* @layer renderer-components @kind types */
type ItemFilter<T> = ((item: T, query: string) => boolean) | undefined;

export type { ItemFilter };
