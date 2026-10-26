/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { BrandApp } from '../../brand/brand.type';
import type { Backdrop } from '../../primitives/BackdropLayer';
import type { FactsPanelGroup } from '../FactsPanel';

type HeroShade = 'fade' | 'scrim' | 'none';

type HeroSize = 'compact' | 'default' | 'tall' | 'full';

type HeroArtMotion = 'still' | 'pan';

interface HeroArtImage {
  kind: 'image';
  src: string;
  alt?: string;
  pixelated?: boolean;
  motion?: HeroArtMotion;
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
  backdrop?: Backdrop | null;
  shade?: HeroShade;
  size?: HeroSize;
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
  backdrop?: Backdrop | null;
}

interface HeroFrameProps extends HeroBackdropLayerProps {
  shade: HeroShade;
  children: ReactNode;
}

interface HeroArtSlotProps {
  art?: HeroArt | null;
}

type HeroIntroProps = Pick<HeroProps, 'eyebrow' | 'title' | 'actions'>;

type HeroBottomProps = Pick<HeroProps, 'facts' | 'panel'>;

export type {
  HeroArt,
  HeroArtMotion,
  HeroArtSlotProps,
  HeroBackdropLayerProps,
  HeroBottomProps,
  HeroFrameProps,
  HeroIntroProps,
  HeroProps,
  HeroShade,
  HeroSize,
};
