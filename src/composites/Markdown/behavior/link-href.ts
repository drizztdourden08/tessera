/* @layer renderer-components @kind util */
import { isAppPath } from './app-path';
import { safeHref } from './safe-href';

const linkHref = (url: string, allowPaths: boolean): string => {
  const safe = safeHref(url);
  if (safe) return safe;
  return allowPaths && isAppPath(url) ? url : '';
};

export { linkHref };
