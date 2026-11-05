/* @layer renderer-components @kind types */
import type { ViewControlsProps } from '../ViewControls.type';

type ViewControlsRowProps = Pick<ViewControlsProps, 'filter' | 'group' | 'sort'>;

export type { ViewControlsRowProps };
