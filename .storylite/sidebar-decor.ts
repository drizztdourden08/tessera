/* @layer root-config @kind logic */
import { lucideBody } from './lucide-body';
import { REVIEW_ROUTE } from './review.constants';
import { SIDEBAR_BODY, SIDEBAR_POLL_MS } from './sidebar-decor.constants';
import { GROUP_ICONS, PAGE_ICONS } from './sidebar-icons.constants';

const sidebarIcons = (root: string) => {
  const groups = Object.fromEntries(Object.entries(GROUP_ICONS).map(([group, icon]) => [group, lucideBody(root, icon)]));
  const pages = Object.fromEntries(Object.entries(PAGE_ICONS).flatMap(([group, entries]) =>
    Object.entries(entries).map(([page, icon]) => [`${group}/${page}`, lucideBody(root, icon)])));
  return { groups, pages };
};

const sidebarDecorScript = (root: string): string => `<script>
(function () {
  var ICONS = ${JSON.stringify(sidebarIcons(root))};
  var ROUTE = ${JSON.stringify(REVIEW_ROUTE)};
  var POLL_MS = ${SIDEBAR_POLL_MS};
${SIDEBAR_BODY}})();
</script>`;

export { sidebarDecorScript };
