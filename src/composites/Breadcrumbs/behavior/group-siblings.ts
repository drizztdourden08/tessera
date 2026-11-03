/* @layer renderer-components @kind logic */
import { SIBLINGS_GROUP_ID } from '../Breadcrumbs.constants';
import type { BreadcrumbSibling, SiblingGroup } from '../Breadcrumbs.type';

const groupSiblings = (siblings: readonly BreadcrumbSibling[]): readonly SiblingGroup[] => {
  const groups: SiblingGroup[] = [];
  siblings.forEach((node) => {
    const { group, ...item } = node;
    const last = groups[groups.length - 1];
    if (last !== undefined && last.label === group) last.items.push(item);
    else groups.push({ id: `${SIBLINGS_GROUP_ID}-${groups.length}`, label: group, items: [item] });
  });
  return groups;
};

export { groupSiblings };
