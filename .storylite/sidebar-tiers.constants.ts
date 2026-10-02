/* @layer root-config @kind data */
const TIER_BODY = `  var TIER_KEY = 'tessera:sidebar-tiers';
  var SVG = 'xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"';
  var tierRows = {};
  var closedTiers = (function () {
    try { return JSON.parse(localStorage.getItem(TIER_KEY) || '{}') || {}; } catch (e) { return {}; }
  })();
  var saveTiers = function () {
    try { localStorage.setItem(TIER_KEY, JSON.stringify(closedTiers)); } catch (e) { /* storage blocked: the state lasts until a reload */ }
  };
  var flag = function (el, name, on) {
    if (on && !el.hasAttribute(name)) el.setAttribute(name, '');
    if (!on && el.hasAttribute(name)) el.removeAttribute(name);
  };
  var setAttr = function (el, name, value) {
    if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  };
  var worst = function (a, b) { return !a || (b && RANK[b] > RANK[a]) ? b : a; };
  var folderOf = function (group) {
    if (!group.hasAttribute('data-folder')) group.setAttribute('data-folder', text(group.querySelector('.story-group__toggle > span')));
    return group.getAttribute('data-folder');
  };
  var placeOf = function (folder) {
    var at = folder.indexOf(' · ');
    var tier = at > 0 ? folder.slice(0, at) : '';
    return TIERS.folders[folder] || (TIERS.icons[tier] ? [tier, folder.slice(at + 3)] : null);
  };
  var searching = function () {
    var box = document.querySelector('.story-search input');
    return !!box && box.value.trim() !== '';
  };
  var tierRow = function (tier) {
    if (tierRows[tier]) return tierRows[tier];
    var row = document.createElement('h2');
    row.className = 'story-tier';
    row.innerHTML = '<button type="button" class="story-group__toggle story-tier__toggle"><svg class="story-tree__chevron" ' + SVG
      + '></svg> <svg class="story-tree__type-icon" ' + SVG + '>' + TIERS.icons[tier] + '</svg> <span></span> <small></small></button>';
    row.querySelector('span').textContent = tier;
    row.firstChild.addEventListener('click', function () {
      if (searching()) return;
      closedTiers[tier] = !closedTiers[tier];
      saveTiers();
      schedule();
    });
    tierRows[tier] = row;
    return row;
  };
  var placeGroup = function (group, tiers, open) {
    var folder = folderOf(group);
    var place = placeOf(folder);
    if (!place) return;
    var label = group.querySelector('.story-group__toggle > span');
    var node = label && label.firstChild;
    if (node && place[1] && node.nodeValue !== place[1]) node.nodeValue = place[1];
    setAttr(group, 'data-tier', place[0]);
    flag(group, 'data-tier-root', !place[1]);
    flag(group, 'data-tier-closed', !open && !!closedTiers[place[0]]);
    var info = tiers[place[0]] || (tiers[place[0]] = { first: group, count: 0, colour: '', active: false });
    info.count += Number(text(group.querySelector('.story-group__toggle > small'))) || 0;
    info.colour = worst(info.colour, colours.groups[folder]);
    info.active = info.active || !!group.querySelector('.story-link.active');
  };
  var paintTier = function (tier, info, open) {
    var row = tierRow(tier);
    var button = row.firstChild;
    var small = button.querySelector('small');
    var closed = !open && !!closedTiers[tier];
    if (row.nextElementSibling !== info.first) info.first.before(row);
    setAttr(button, 'aria-expanded', String(!closed));
    setIcon(button.firstChild, closed ? 'closed' : 'open', closed ? TIERS.closed : TIERS.open);
    if (small.textContent !== String(info.count)) small.textContent = String(info.count);
    mark(button, info.colour);
    flag(button, 'data-current', closed && info.active);
  };
  var decorateTiers = function () {
    var nav = document.querySelector('nav.story-tree');
    if (!nav) return;
    var open = searching();
    var tiers = {};
    nav.querySelectorAll(':scope > .story-group').forEach(function (group) { placeGroup(group, tiers, open); });
    Object.keys(tierRows).forEach(function (tier) {
      if (!tiers[tier] && tierRows[tier].parentNode) tierRows[tier].remove();
    });
    Object.keys(tiers).forEach(function (tier) { paintTier(tier, tiers[tier], open); });
  };
  window.addEventListener('hashchange', function () { schedule(); });
  document.addEventListener('input', function () { schedule(); });
`;

export { TIER_BODY };
