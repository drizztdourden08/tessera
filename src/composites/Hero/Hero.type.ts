/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FactsPanelGroup } from '../FactsPanel';

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
  facts?: readonly FactsPanelGroup[];
  aside?: ReactNode;
  panel?: ReactNode;
  label?: string;
  className?: string;
}

type HeroIntroProps = Pick<HeroProps, 'eyebrow' | 'title' | 'actions'>;

type HeroBottomProps = Pick<HeroProps, 'facts' | 'panel'>;

export type { HeroArt, HeroBottomProps, HeroIntroProps, HeroProps };
