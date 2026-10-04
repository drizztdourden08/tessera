/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';
import type { HeadingLevel } from '../Title/Title.type';

type CardVariant = 'default' | 'interactive' | 'danger';

type CardTone = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

interface CardHeading {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  count?: number;
  tone?: CardTone;
  level?: HeadingLevel;
}

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, CardHeading {
  variant?: CardVariant;
  children: ReactNode;
}

export type {
  CardHeading, CardProps, CardTone, CardVariant,
};
