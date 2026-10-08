/* @layer renderer-components @kind types */
import type { ResizeHandleProps } from '../ResizeHandle.type';

type ResizeOptions = ResizeHandleProps & Required<Pick<ResizeHandleProps, 'orientation' | 'edge' | 'step' | 'largeStep'>>;

export type { ResizeOptions };
