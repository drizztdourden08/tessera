/* @layer root-config @kind data */
const SIDEBAR_BODY = `  var colours = { pages: {}, groups: {}, notes: {} };
  var noted = {};
  var queued = false;
  var text = function (el) { return el ? el.textContent.trim() : ''; };
  var setIcon = function (svg, key, body) {
    if (!svg || !body || svg.getAttribute('data-icon') === key) return;
    svg.innerHTML = body;
    svg.setAttribute('data-icon', key);
  };
  var mark = function (row, colour, note) {
    if (!row) return;
    if (colour && row.getAttribute('data-review') !== colour) row.setAttribute('data-review', colour);
    flag(row, 'data-note', !!note);
  };
  var decorate = function () {
    queued = false;
    decorateTiers();
    document.querySelectorAll('.story-group').forEach(function (group) {
      var toggle = group.querySelector('.story-group__toggle');
      var folder = folderOf(group);
      setIcon(toggle && toggle.querySelector('.story-tree__type-icon'), folder, ICONS.groups[folder]);
      mark(toggle, colours.groups[folder], noted[folder]);
      group.querySelectorAll('.story-component').forEach(function (page) {
        var pageToggle = page.querySelector('.story-component__toggle');
        var key = folder + '/' + text(pageToggle && pageToggle.querySelector(':scope > span'));
        setIcon(pageToggle && pageToggle.querySelector('.story-tree__type-icon'), key, ICONS.pages[key]);
        mark(pageToggle, colours.pages[key], colours.notes[key]);
      });
    });
  };
  var schedule = function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(decorate);
  };
  window.addEventListener(EVENT, function (e) {
    colours = Object.assign({ notes: {} }, e.detail);
    noted = {};
    Object.keys(colours.notes).forEach(function (title) { noted[title.slice(0, title.lastIndexOf('/'))] = true; });
    schedule();
  });
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  schedule();
`;

const SIDEBAR_POLL = `  var refresh = function () {
    fetch(ROUTE, { cache: 'no-store' })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (next) { if (next && next.pages) window.dispatchEvent(new CustomEvent(EVENT, { detail: next })); })
      .catch(function () { /* the review route is down: no colours */ });
  };
  window.addEventListener('focus', refresh);
  setInterval(refresh, POLL_MS);
  refresh();
`;

const SIDEBAR_POLL_MS = 3000;

export { SIDEBAR_BODY, SIDEBAR_POLL, SIDEBAR_POLL_MS };
