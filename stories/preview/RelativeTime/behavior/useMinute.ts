/* @layer stories @kind hook */
import { useSyncExternalStore } from 'react';
import { minuteClock } from './minute-clock';

const useMinute = (): number => useSyncExternalStore(minuteClock.subscribe, minuteClock.read, minuteClock.read);

export { useMinute };
