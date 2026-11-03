/* @layer renderer-components @kind util */
import type { BreadcrumbSegment, SiblingMenu } from '../Breadcrumbs.type';

const siblingMenu = (segment: BreadcrumbSegment): SiblingMenu => {
  const { siblings, opensMenu } = segment;
  const menu = siblings !== undefined && siblings.length > 0 ? siblings : undefined;
  return menu !== undefined && opensMenu === true ? { menu, asMenu: true } : { menu, asMenu: false };
};

export { siblingMenu };
