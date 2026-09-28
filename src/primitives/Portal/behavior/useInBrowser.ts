/* @layer renderer-components @kind hook */
import { useSyncExternalStore } from 'react';

const subscribeNever = () => () => undefined;

const useInBrowser = (): boolean => useSyncExternalStore(subscribeNever, () => true, () => false);

export { useInBrowser };
