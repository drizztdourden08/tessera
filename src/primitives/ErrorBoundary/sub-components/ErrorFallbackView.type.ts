/* @layer renderer-components @kind types */
import type { ErrorFallbackProps } from '../../TesseraProvider/TesseraProvider.type';

type ErrorFallbackViewProps = Omit<ErrorFallbackProps, 'label'> & { label?: string };

export type { ErrorFallbackViewProps };
