/* @layer stories @kind types */
import type { ItemCardMediaTone } from '../../../../src/composites';
import type { IconName } from '../../../../src/primitives';

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

interface SiteFrameProps {
  phone?: boolean;
}

interface StorePageProps {
  section: StoreSection;
  selectedId: string;
  onSelect: (id: string) => void;
}

type SiteHeaderArgs = {
  links: boolean;
  actions: boolean;
  name: boolean;
  width: 'wide' | 'phone';
};

export type { SiteFrameProps, SiteHeaderArgs, StoreItem, StorePageProps, StoreSection };
