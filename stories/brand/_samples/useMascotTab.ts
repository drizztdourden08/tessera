/* @layer stories @kind hook */
import { useCallback, useSyncExternalStore } from 'react';
import type { AnimatedMascotBrand } from '../../../src/brand';
import { MASCOT_TAB_EVENT, MASCOT_TAB_KEY, MASCOT_TABS } from './mascot-tab.constants';

let unsaved: AnimatedMascotBrand = MASCOT_TABS[0] ?? 'rotp';

const isTab = (value: unknown): value is AnimatedMascotBrand => MASCOT_TABS.some((tab) => tab === value);

const readTab = (): AnimatedMascotBrand => {
  try {
    const stored = window.localStorage.getItem(MASCOT_TAB_KEY);
    return isTab(stored) ? stored : unsaved;
  } catch {
    return unsaved;
  }
};

const subscribe = (onChange: () => void): (() => void) => {
  window.addEventListener(MASCOT_TAB_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(MASCOT_TAB_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
};

const saveTab = (brand: AnimatedMascotBrand): boolean => {
  try {
    window.localStorage.setItem(MASCOT_TAB_KEY, brand);
    return true;
  } catch {
    return false;
  }
};

const useMascotTab = (): readonly [AnimatedMascotBrand, (brand: AnimatedMascotBrand) => void] => {
  const brand = useSyncExternalStore(subscribe, readTab, () => unsaved);
  const choose = useCallback((next: AnimatedMascotBrand) => {
    unsaved = next;
    saveTab(next);
    window.dispatchEvent(new Event(MASCOT_TAB_EVENT));
  }, []);
  return [brand, choose] as const;
};

export { useMascotTab };
