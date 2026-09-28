/* @layer root-config @kind logic */
import { GALLERY_APPS, SWITCHER_BODY } from './app-switcher.constants';
import { markSvg } from './mark-svg';

const appSwitcherScript = (): string => {
  const apps = GALLERY_APPS.map((app) => ({ ...app, icon: markSvg(app.id, '20px') }));
  return `<script>
(function () {
  var APPS = ${JSON.stringify(apps)};
${SWITCHER_BODY}})();
</script>`;
};

export { appSwitcherScript };
