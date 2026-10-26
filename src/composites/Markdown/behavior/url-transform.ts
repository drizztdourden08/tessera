/* @layer renderer-components @kind util */
import { linkHref } from './link-href';

const urlTransformOf = (allowPaths: boolean) => (url: string, key: string): string => (key === 'src' ? url : linkHref(url, allowPaths));

export { urlTransformOf };
