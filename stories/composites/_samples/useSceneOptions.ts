/* @layer stories @kind hook */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';

const SEEN_SHARE = 0.6;
const GEAR = '.widget__titlebar-actions .widget__btn:nth-last-child(2)';

type SceneOptions = {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  toggle: (gear: HTMLElement) => void;
  close: () => void;
};

const useSceneOptions = (sceneRef: RefObject<HTMLElement | null>, shown: boolean): SceneOptions => {
  const [gear, setGear] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const userClosed = useRef(false);

  useEffect(() => {
    setGear(shown ? sceneRef.current?.querySelector<HTMLElement>(GEAR) ?? null : null);
    if (!shown) setOpen(false);
  }, [sceneRef, shown]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return undefined;
    const watch = new IntersectionObserver(([entry]) => {
      if (entry && entry.intersectionRatio >= SEEN_SHARE && !userClosed.current) setOpen(true);
    }, { threshold: SEEN_SHARE });
    watch.observe(scene);
    return () => watch.disconnect();
  }, [sceneRef]);

  const anchorRef = useMemo(() => ({ current: gear }), [gear]);
  const toggle = (next: HTMLElement) => {
    setGear(next);
    userClosed.current = open;
    setOpen(!open);
  };
  return { open: open && gear !== null, anchorRef, toggle, close: () => setOpen(false) };
};

export { useSceneOptions };
