/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BrandApp } from '../../brand/brand.type';
import type { FactsPanelGroup } from '../FactsPanel';

type HeroImageFit = 'cover' | 'contain' | 'tile';

type HeroShade = 'fade' | 'scrim' | 'none';

interface HeroBackdropImage {
  kind: 'image';
  src: string;
  fit?: HeroImageFit;
  position?: string;
  tileSize?: string;
  color?: string;
  pixelated?: boolean;
}

interface HeroBackdropColor {
  kind: 'color';
  color: string;
}

interface HeroBackdropNode {
  kind: 'node';
  node: ReactNode;
}

type HeroBackdrop = HeroBackdropImage | HeroBackdropColor | HeroBackdropNode;

interface HeroArtImage {
  kind: 'image';
  src: string;
  alt?: string;
  pixelated?: boolean;
}

interface HeroArtNode {
  kind: 'node';
  node: ReactNode;
  label?: string;
}

type HeroArt = HeroArtImage | HeroArtNode;

interface HeroProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  brand?: BrandApp;
  backdrop?: HeroBackdrop | null;
  shade?: HeroShade;
  art?: HeroArt | null;
  actions?: ReactNode;
  tools?: ReactNode;
  facts?: readonly FactsPanelGroup[];
  aside?: ReactNode;
  panel?: ReactNode;
  label?: string;
  className?: string;
}

interface HeroBackdropLayerProps {
  backdrop?: HeroBackdrop | null;
}

interface HeroArtSlotProps {
  art?: HeroArt | null;
}

type HeroIntroProps = Pick<HeroProps, 'eyebrow' | 'title' | 'actions'>;

type HeroBottomProps = Pick<HeroProps, 'facts' | 'panel'>;

export type {
  HeroArt,
  HeroArtSlotProps,
  HeroBackdrop,
  HeroBackdropColor,
  HeroBackdropImage,
  HeroBackdropLayerProps,
  HeroBottomProps,
  HeroImageFit,
  HeroIntroProps,
  HeroProps,
  HeroShade,
};
