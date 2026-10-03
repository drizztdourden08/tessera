/* @layer root-config @kind logic */
import { lucideBody } from './lucide-body';
import { REVIEW_EVENT, REVIEW_RANK, REVIEW_ROUTE } from './review.constants';
import { SIDEBAR_BODY, SIDEBAR_POLL_MS } from './sidebar-decor.constants';
import { GROUP_ICONS, PAGE_ICONS } from './sidebar-icons.constants';
import { TIER_BODY } from './sidebar-tiers.constants';
import { sidebarTiers } from './sidebar-tiers';

const sidebarIcons = (root: string) => {
  const groups = Object.fromEntries(Object.entries(GROUP_ICONS).map(([group, icon]) => [group, lucideBody(root, icon)]));
  const pages = Object.fromEntries(Object.entries(PAGE_ICONS).flatMap(([group, entries]) =>
    Object.entries(entries).map(([page, icon]) => [`${group}/${page}`, lucideBody(root, icon)])));
  return { groups, pages };
};

const sidebarDecorScript = (root: string): string => `<script>
(function () {
  var ICONS = ${JSON.stringify(sidebarIcons(root))};
  var TIERS = ${JSON.stringify(sidebarTiers(root))};
  var RANK = ${JSON.stringify(REVIEW_RANK)};
  var ROUTE = ${JSON.stringify(REVIEW_ROUTE)};
  var EVENT = ${JSON.stringify(REVIEW_EVENT)};
  var POLL_MS = ${SIDEBAR_POLL_MS};
${TIER_BODY}${SIDEBAR_BODY}})();
</script>`;

export { sidebarDecorScript };
