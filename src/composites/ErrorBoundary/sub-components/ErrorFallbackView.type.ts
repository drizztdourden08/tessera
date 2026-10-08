/* @layer renderer-components @kind types */
import type { ErrorFallbackProps } from '../../../primitives/TesseraProvider/TesseraProvider.type';

type ErrorFallbackViewProps = Omit<ErrorFallbackProps, 'label'> & { label?: string; retry: boolean };

export type { ErrorFallbackViewProps };
