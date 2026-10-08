/* @layer stories @kind types */
import type { ReactNode } from 'react';
import type { ItemCardMediaTone } from '../../../src/composites';
import type { IconName } from '../../../src/primitives';

interface StoreSection {
  id: string;
  label: string;
  icon: IconName;
  group: string;
}

interface StoreItem {
  id: string;
  name: string;
  kind: string;
  icon: IconName;
  tone: ItemCardMediaTone;
  installs: string;
}

interface PublicationRow {
  id: string;
  name: string;
  kind: string;
  version: string;
  installs: number;
  state: string;
}

interface SiteFrameProps {
  phone?: boolean;
  labels?: boolean;
}

interface StorePageProps {
  section: StoreSection;
  selectedId: string;
  onSelect: (id: string) => void;
  labels: boolean;
}

interface StoreItemsProps {
  selectedId?: string;
  onSelect?: (id: string) => void;
}

type PartPlace = 'top-end' | 'bottom-end' | 'bottom-start' | 'bottom-center';

interface PartTagProps {
  name: string;
  show: boolean;
  site?: boolean;
  place?: PartPlace;
  className?: string;
  children: ReactNode;
}

interface SignInPageProps {
  ground: 'dark' | 'light';
}

type SiteHeaderArgs = {
  links: boolean;
  signedIn: boolean;
  title: boolean;
  width: 'wide' | 'phone';
};

type SiteFooterArgs = {
  logo: boolean;
  note: boolean;
  links: boolean;
  width: 'wide' | 'phone';
};

export type {
  PartTagProps, PublicationRow, SignInPageProps, SiteFooterArgs, SiteFrameProps, SiteHeaderArgs, StoreItem, StoreItemsProps, StorePageProps,
  StoreSection,
};
