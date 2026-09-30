/* @layer root-config @kind data */
const SIDEBAR_BODY = `  var colours = { pages: {}, groups: {} };
  var queued = false;
  var text = function (el) { return el ? el.textContent.trim() : ''; };
  var setIcon = function (svg, key, body) {
    if (!svg || !body || svg.getAttribute('data-icon') === key) return;
    svg.innerHTML = body;
    svg.setAttribute('data-icon', key);
  };
  var mark = function (row, colour) {
    if (row && colour && row.getAttribute('data-review') !== colour) row.setAttribute('data-review', colour);
  };
  var decorate = function () {
    queued = false;
    document.querySelectorAll('.story-group').forEach(function (group) {
      var toggle = group.querySelector('.story-group__toggle');
      var folder = text(toggle && toggle.querySelector(':scope > span'));
      setIcon(toggle && toggle.querySelector('.story-tree__type-icon'), folder, ICONS.groups[folder]);
      mark(toggle, colours.groups[folder]);
      group.querySelectorAll('.story-component').forEach(function (page) {
        var pageToggle = page.querySelector('.story-component__toggle');
        var key = folder + '/' + text(pageToggle && pageToggle.querySelector(':scope > span'));
        setIcon(pageToggle && pageToggle.querySelector('.story-tree__type-icon'), key, ICONS.pages[key]);
        mark(pageToggle, colours.pages[key]);
      });
    });
  };
  var schedule = function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(decorate);
  };
  var refresh = function () {
    fetch(ROUTE, { cache: 'no-store' })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (next) { if (next && next.pages) { colours = next; schedule(); } })
      .catch(function () { /* a built gallery has no review route: no colours */ });
  };
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('focus', refresh);
  setInterval(refresh, POLL_MS);
  refresh();
  schedule();
`;

const SIDEBAR_POLL_MS = 3000;

export { SIDEBAR_BODY, SIDEBAR_POLL_MS };
