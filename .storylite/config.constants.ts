/* @layer root-config @kind data */
const ROOT = process.cwd();

const LEAVE_MAXIMIZED = `<script>
try {
  var key = 'storylite:toolbar-settings';
  var settings = JSON.parse(localStorage.getItem(key) || '{}');
  var onStory = location.hash.indexOf('#/story/') === 0 || location.hash.indexOf('#/canvas/') === 0;
  if (settings.maximized && !onStory) {
    settings.maximized = false;
    localStorage.setItem(key, JSON.stringify(settings));
  }
} catch (e) { /* storage blocked: nothing was remembered either */ }
</script>`;

const HOME_LOGO_MOUNT = '<script type="module" src="/.storylite/home-logo-mount.ts"></script>';

export { HOME_LOGO_MOUNT, LEAVE_MAXIMIZED, ROOT };
