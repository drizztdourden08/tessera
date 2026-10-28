/* @layer renderer-components @kind logic */
import { PATH_SEPARATOR } from '../Breadcrumbs.constants';
import type { BreadcrumbSegment } from '../Breadcrumbs.type';

const pathTextOf = (segments: readonly BreadcrumbSegment[], path: string | undefined): string =>
  path ?? segments.map((segment) => segment.label).join(PATH_SEPARATOR);

export { pathTextOf };
