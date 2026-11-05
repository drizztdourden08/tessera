/* @layer renderer-components @kind types */
import type { HTMLAttributes } from 'react';

type ActivationProps = Pick<HTMLAttributes<HTMLDivElement>, 'tabIndex' | 'onClick' | 'onKeyDown'>;

export type { ActivationProps };
