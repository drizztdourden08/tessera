/* @layer root-config @kind data */
import { BRAND_FAMILY } from '../src/brand/family.constants';
import type { GalleryApp } from './app-switcher.type';

const GALLERY_APPS: readonly GalleryApp[] = (['tessera', 'rotp', 'archipelia'] as const).map((id) => ({ id, name: BRAND_FAMILY[id].name }));

const SWITCHER_BODY = `  var KEY = 'storylite:toolbar-settings';
  var GROUP_ID = 'tessera-app-switch';
  var readSettings = function () {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
  };
  var writeSettings = function (change) {
    try {
      var s = readSettings();
      s.previewTheme = 'dark';
      s.customTools = Object.assign({}, s.customTools, change);
      localStorage.setItem(KEY, JSON.stringify(s));
    } catch (e) { /* storage blocked: the live control still works on a story */ }
  };
  var paletteItem = function (name) {
    return Array.prototype.find.call(document.querySelectorAll('.toolbar-dropdown__item'), function (b) {
      return b.textContent.trim() === name;
    });
  };
  var shownApp = function () {
    var frame = document.querySelector('iframe');
    var body = frame && frame.contentDocument && frame.contentDocument.body;
    var live = body && body.getAttribute('data-palette');
    return live || (readSettings().customTools || {}).palette || APPS[0].id;
  };
  var pick = function (app) {
    var item = paletteItem(app.name);
    if (item) item.click();
    else writeSettings({ palette: app.id });
    setTimeout(sync, 60);
  };
  var build = function () {
    var group = document.createElement('div');
    group.id = GROUP_ID;
    group.className = 'app-switch';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'App');
    APPS.forEach(function (app) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'app-switch__button';
      button.dataset.app = app.id;
      button.title = app.name;
      button.setAttribute('aria-label', 'Show every story as ' + app.name);
      button.innerHTML = app.icon;
      button.addEventListener('click', function () { pick(app); });
      group.appendChild(button);
    });
    return group;
  };
  var sync = function () {
    var dark = document.querySelector('button[aria-label="Use dark theme"]');
    if (dark && !dark.classList.contains('active')) dark.click();
    var brand = document.querySelector('.brand');
    if (!brand) return;
    var group = document.getElementById(GROUP_ID);
    if (!group || group.parentElement !== brand) {
      if (group) group.remove();
      group = build();
      var content = brand.querySelector('.brand__content');
      brand.insertBefore(group, content ? content.nextSibling : null);
    }
    var active = shownApp();
    group.querySelectorAll('button').forEach(function (b) {
      var on = b.dataset.app === active;
      b.classList.toggle('active', on);
      if (b.getAttribute('aria-pressed') !== String(on)) b.setAttribute('aria-pressed', String(on));
    });
  };
  writeSettings({});
  new MutationObserver(sync).observe(document.body, { childList: true, subtree: true });
  setInterval(sync, 500);
  sync();
`;

export { GALLERY_APPS, SWITCHER_BODY };
