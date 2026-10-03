/* @layer root-config @kind logic */
import { lucideBody } from './lucide-body';
import { CONTROL_BASE, NOTE_BODY, STATUS_BODY } from './review-control.constants';
import { REVIEW_CONTROL_ID, REVIEW_NOTE_ICONS, REVIEW_OPTIONS } from './review-options.constants';
import { REVIEW_EVENT, REVIEW_NOTE_LIMIT, REVIEW_NOTE_ROUTE, REVIEW_SET_ROUTE } from './review.constants';
import { componentPages } from './story-index';

const reviewControlScript = (root: string): string => {
  const titles = Object.fromEntries(Object.entries(componentPages(root)).map(([title, id]) => [id.replace(/--overview$/, ''), title]));
  const options = REVIEW_OPTIONS.map((option) => ({ ...option, icon: lucideBody(root, option.icon) }));
  const notes = { add: lucideBody(root, REVIEW_NOTE_ICONS.add), open: lucideBody(root, REVIEW_NOTE_ICONS.open) };
  const config = {
    id: REVIEW_CONTROL_ID, event: REVIEW_EVENT, setRoute: REVIEW_SET_ROUTE, noteRoute: REVIEW_NOTE_ROUTE, limit: REVIEW_NOTE_LIMIT,
  };
  return `<script>
(function () {
  var TITLES = ${JSON.stringify(titles)};
  var OPTIONS = ${JSON.stringify(options)};
  var NOTE_ICONS = ${JSON.stringify(notes)};
  var CONFIG = ${JSON.stringify(config)};
${CONTROL_BASE}${NOTE_BODY}${STATUS_BODY}})();
</script>`;
};

export { reviewControlScript };
