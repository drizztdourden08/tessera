/* @layer renderer-components @kind types */
import type { AnchoredBarProps } from '../AnchoredBar.type';

type ResolvedBarProps = Omit<AnchoredBarProps, 'inline' | 'placement' | 'margin' | 'gap' | 'dock' | 'follow' | 'role' | 'error'>
  & Required<Pick<AnchoredBarProps, 'inline' | 'placement' | 'margin' | 'gap' | 'dock' | 'follow' | 'role' | 'error'>>;

export type { ResolvedBarProps };
