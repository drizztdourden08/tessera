/* @layer stories @kind types */
import type { RefObject } from 'react';
import type { AnimatedMascotChoice } from '../../../src/brand';
import type { GuidedTourApi } from '../../../src/composites';

interface TourDemoParts {
  nav: RefObject<HTMLElement | null>;
  cards: RefObject<HTMLElement | null>;
  gear: RefObject<HTMLButtonElement | null>;
  settings: RefObject<HTMLElement | null>;
  restart: RefObject<HTMLButtonElement | null>;
  setSettings: (open: boolean) => void;
}

interface TourDemoProps {
  mascot: AnimatedMascotChoice | false;
  startAt?: number;
}

interface TourDemoScreenProps {
  parts: TourDemoParts;
  tour: GuidedTourApi;
  settingsOpen: boolean;
  startAt: number;
}

export type { TourDemoParts, TourDemoProps, TourDemoScreenProps };
