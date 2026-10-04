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

const PREVIEW_ALLOWS_FULLSCREEN = `<script>
(function () {
  var plain = '<iframe title="StoryLite isolated preview">';
  var allowed = '<iframe title="StoryLite isolated preview" allow="fullscreen" allowfullscreen>';
  var inner = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  if (!inner || !inner.set || !inner.get) return;
  Object.defineProperty(HTMLTemplateElement.prototype, 'innerHTML', {
    configurable: true,
    get: function () { return inner.get.call(this); },
    set: function (html) {
      var text = String(html);
      inner.set.call(this, text.indexOf(plain) < 0 ? html : text.split(plain).join(allowed));
    },
  });
})();
</script>`;

const HOME_LOGO_SOURCE = '/.storylite/home-logo-mount.ts';

const HOME_LOGO_BUILD_FILE = 'storylite-assets/home-logo-mount.js';

const HOME_LOGO_MOUNT = {
  dev: `<script type="module" src="${HOME_LOGO_SOURCE}"></script>`,
  build: `<script type="module" src="./${HOME_LOGO_BUILD_FILE}"></script>`,
};

const FAVICON_FILE = 'brand/tessera/mark/mark.ico';

const FAVICON = `<script>
document.querySelectorAll('link[rel="icon"]').forEach(function (link) { link.remove(); });
</script>
<link rel="icon" type="image/x-icon" href="./${FAVICON_FILE}" />`;

export { FAVICON, FAVICON_FILE, HOME_LOGO_BUILD_FILE, HOME_LOGO_MOUNT, HOME_LOGO_SOURCE, LEAVE_MAXIMIZED, PREVIEW_ALLOWS_FULLSCREEN, ROOT };
