/* @layer renderer-components @kind types */
interface UseOpenStateParams {
  open: boolean | undefined;
  defaultOpen: boolean;
  onOpenChange: ((open: boolean) => void) | undefined;
  storageKey: string | undefined;
}

type OpenUpdate = boolean | ((was: boolean) => boolean);

export type { OpenUpdate, UseOpenStateParams };
