/* @layer renderer-components @kind types */
import type { ErrorFallbackProps } from '../../../primitives/TesseraProvider/TesseraProvider.type';

type ErrorFallbackViewProps = Omit<ErrorFallbackProps, 'label'> & { label?: string };

export type { ErrorFallbackViewProps };
