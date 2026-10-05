/* @layer renderer-components @kind util */
const openChange = (createOpen: boolean | undefined, setOwn: (open: boolean) => void, onCreateOpenChange?: (open: boolean) => void) =>
  (open: boolean): void => {
    if (createOpen === undefined) setOwn(open);
    onCreateOpenChange?.(open);
  };

export { openChange };
