/* @layer renderer-components @kind types */
import type { BoxProps } from '../Box';

type PageRootProps = Omit<BoxProps, 'as' | 'surface' | 'disabled' | 'open'>;

export type { PageRootProps };
