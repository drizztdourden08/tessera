/* @layer root-config @kind logic */
const componentPagesScript = (pages: Record<string, string>): string => `<script>
(function () {
  var PAGES = ${JSON.stringify(pages)};
  var openedByChevron = {};
  var busy = false;
  var keyOf = function (section) {
    var name = section.querySelector('.story-component__toggle > span');
    var group = section.closest('.story-group');
    var folder = group && group.querySelector('.story-group__toggle > span');
    return (folder ? folder.textContent.trim() + '/' : '') + (name ? name.textContent.trim() : '');
  };
  var searching = function () {
    var box = document.querySelector('.story-search input');
    return box && box.value.trim() !== '';
  };
  document.addEventListener('click', function (e) {
    if (busy) return;
    var toggle = e.target.closest && e.target.closest('.story-component__toggle');
    if (!toggle) return;
    var key = keyOf(toggle.closest('.story-component'));
    if (e.target.closest('.story-tree__chevron')) {
      openedByChevron[key] = toggle.getAttribute('aria-expanded') !== 'true';
      return;
    }
    var page = PAGES[key];
    if (!page) return;
    e.preventDefault();
    e.stopPropagation();
    location.hash = '#/story/' + page;
  }, true);
  var closeAutoOpened = function () {
    if (searching()) return;
    document.querySelectorAll('.story-component__toggle[aria-expanded="true"]').forEach(function (toggle) {
      if (openedByChevron[keyOf(toggle.closest('.story-component'))]) return;
      busy = true;
      toggle.click();
      busy = false;
    });
  };
  new MutationObserver(closeAutoOpened).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-expanded'] });
  closeAutoOpened();
})();
</script>`;

export { componentPagesScript };
