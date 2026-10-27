/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';
import type { HeadingLevel } from '../Title/Title.type';

type CardVariant = 'default' | 'interactive' | 'danger';

type CardTone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

type CardEdge = 'left' | 'border';

interface CardHeading {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  count?: number;
  hideZero?: boolean;
  tone?: CardTone;
  level?: HeadingLevel;
}

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, CardHeading {
  variant?: CardVariant;
  edgeTone?: CardTone;
  edge?: CardEdge;
  fill?: boolean;
  children: ReactNode;
}

export type {
  CardEdge, CardHeading, CardProps, CardTone, CardVariant,
};
