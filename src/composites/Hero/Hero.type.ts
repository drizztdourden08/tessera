/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface HeroFact {
  label: string;
  value: ReactNode;
  title?: string;
  mono?: boolean;
}

type HeroFactRow = readonly HeroFact[];

interface HeroArt {
  src: string;
  alt?: string;
  pixelated?: boolean;
}

interface HeroProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  backdrop?: ReactNode;
  art?: HeroArt | null;
  actions?: ReactNode;
  tools?: ReactNode;
  facts?: readonly HeroFactRow[];
  aside?: ReactNode;
  panel?: ReactNode;
  label?: string;
  className?: string;
}

type HeroIntroProps = Pick<HeroProps, 'eyebrow' | 'title' | 'actions'>;

type HeroBottomProps = Pick<HeroProps, 'facts' | 'panel'>;

interface HeroFactsProps {
  rows: readonly HeroFactRow[];
}

export type { HeroArt, HeroBottomProps, HeroFact, HeroFactRow, HeroFactsProps, HeroIntroProps, HeroProps };
