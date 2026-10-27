/* @layer renderer-components @kind util */
import type { ReactNode } from 'react';
import type { ContentHeaderVariant } from '../ContentHeader.type';

const headerBackdrop = (variant: ContentHeaderVariant | undefined, backdrop: ReactNode): ReactNode =>
  (variant === 'plain' ? null : backdrop);

export { headerBackdrop };
