/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { CardHeading } from '../Card.type';

interface CardHeaderProps extends CardHeading {
  header?: ReactNode;
}

export type { CardHeaderProps };
