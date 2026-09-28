/* @layer renderer-components @kind util */
const acceptAttribute = (accept: readonly string[] | undefined): string | undefined =>
  accept?.length ? [...accept, 'application/octet-stream'].join(',') : undefined;

export { acceptAttribute };
