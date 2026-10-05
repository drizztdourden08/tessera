/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { GuidedTour, useGuidedTour } from '../../../src/composites';
import { tourDemoSteps } from './tour-demo-steps';
import { TourDemoScreen } from './TourDemoScreen';
import type { TourDemoParts, TourDemoProps } from './TourDemo.type';

const TourDemo = (props: TourDemoProps) => {
  const { mascot, startAt = 0, keepTitle = false } = props;
  const [settingsOpen, setSettings] = useState(false);
  const titlebar = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const cards = useRef<HTMLElement>(null);
  const gear = useRef<HTMLButtonElement>(null);
  const settings = useRef<HTMLElement>(null);
  const restart = useRef<HTMLButtonElement>(null);
  const parts = useMemo<TourDemoParts>(() => ({ titlebar, nav, cards, gear, settings, restart, setSettings }), []);
  const steps = useMemo(() => tourDemoSteps(parts, keepTitle), [parts, keepTitle]);
  const tour = useGuidedTour({ steps });

  return (
    <>
      <TourDemoScreen parts={parts} tour={tour} settingsOpen={settingsOpen} startAt={startAt} lifted={keepTitle} />
      <GuidedTour tour={tour} mascot={mascot} keep={keepTitle ? [titlebar] : undefined} />
    </>
  );
};

export { TourDemo };
