/* @layer stories @kind types */
import type { RefObject } from 'react';
import type { AnimatedMascotChoice } from '../../../src/brand';
import type { GuidedTourApi } from '../../../src/composites';

interface TourDemoParts {
  titlebar: RefObject<HTMLElement | null>;
  nav: RefObject<HTMLElement | null>;
  cards: RefObject<HTMLElement | null>;
  gear: RefObject<HTMLButtonElement | null>;
  settings: RefObject<HTMLElement | null>;
  restart: RefObject<HTMLButtonElement | null>;
  setSettings: (open: boolean) => void;
}

interface TourSampleProps {
  mascot: AnimatedMascotChoice | false;
}

interface TourDemoProps extends TourSampleProps {
  startAt?: number;
  keepTitle?: boolean;
}

interface TourDemoScreenProps {
  parts: TourDemoParts;
  tour: GuidedTourApi;
  settingsOpen: boolean;
  startAt: number;
  lifted: boolean;
}

export type { TourDemoParts, TourDemoProps, TourDemoScreenProps, TourSampleProps };
