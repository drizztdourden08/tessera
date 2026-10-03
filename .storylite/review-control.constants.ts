/* @layer root-config @kind data */

const CONTROL_BASE = `  var state = null;
  var pending = {};
  var queued = false;
  var svg = function (body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">' + body + '</svg>';
  };
  var setAttr = function (el, name, value) {
    if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  };
  var currentTitle = function () {
    var match = /^#\\/story\\/([^/?#]+)/.exec(location.hash);
    return match ? TITLES[decodeURIComponent(match[1]).split('--')[0]] || '' : '';
  };
  var post = function (route, payload) {
    return fetch(route, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw new Error(body.error || res.statusText);
          window.dispatchEvent(new CustomEvent(CONFIG.event, { detail: body }));
        });
      });
  };
`;

const NOTE_BODY = `  var noteTitle = '';
  var buildNote = function (box) {
    var button = document.createElement('button');
    var panel = document.createElement('div');
    button.type = 'button';
    button.className = 'toolbar__icon-button review-note__button';
    button.setAttribute('popovertarget', CONFIG.id + '-note');
    panel.id = CONFIG.id + '-note';
    panel.className = 'toolbar-dropdown__panel review-note';
    panel.setAttribute('popover', 'auto');
    panel.setAttribute('role', 'dialog');
    panel.innerHTML = '<label class="review-note__label"><span></span><textarea rows="5"></textarea></label>'
      + '<div class="review-note__actions"><button type="button" data-act="delete">Delete</button>'
      + '<small class="review-note__hint" aria-live="polite"></small>'
      + '<button type="button" data-act="cancel">Cancel</button><button type="button" data-act="save">Save</button></div>';
    var field = panel.querySelector('textarea');
    var hint = panel.querySelector('.review-note__hint');
    field.maxLength = CONFIG.limit;
    var save = function (text) {
      hint.textContent = 'Saving';
      post(CONFIG.noteRoute, { title: noteTitle, text: text })
        .then(function () { panel.hidePopover(); })
        .catch(function (error) { hint.textContent = error.message; });
    };
    panel.addEventListener('toggle', function (e) {
      if (e.newState !== 'open') return;
      var note = state.notes[currentTitle()];
      noteTitle = currentTitle();
      panel.setAttribute('aria-label', 'Note on ' + noteTitle);
      panel.querySelector('.review-note__label > span').textContent = 'Note on ' + noteTitle.slice(noteTitle.lastIndexOf('/') + 1);
      panel.querySelector('[data-act="delete"]').hidden = !note;
      hint.textContent = 'Ctrl+Enter saves';
      field.value = note ? note.text : '';
      field.focus();
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || !(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      save(field.value);
    });
    panel.addEventListener('click', function (e) {
      var act = e.target.closest && e.target.closest('[data-act]');
      var which = act && act.getAttribute('data-act');
      if (which === 'cancel') panel.hidePopover();
      if (which === 'save' || which === 'delete') save(which === 'save' ? field.value : '');
    });
    box.appendChild(button);
    box.appendChild(panel);
  };
  var paintNote = function (box, title) {
    var button = box.querySelector('.review-note__button');
    var note = state.notes[title];
    var label = note ? 'Edit your note on this page' : 'Leave a note on this page';
    setAttr(button, 'title', label);
    setAttr(button, 'aria-label', label);
    setAttr(button, 'data-has-note', String(!!note));
    if (button.getAttribute('data-icon') !== String(!!note)) {
      button.innerHTML = svg(note ? NOTE_ICONS.open : NOTE_ICONS.add);
      button.setAttribute('data-icon', String(!!note));
    }
  };
`;

const STATUS_BODY = `  var paint = function () {
    var box = document.getElementById(CONFIG.id);
    var title = currentTitle();
    if (!box || !title || !state) return;
    var mark = state.marks[title] || { status: 'new', changed: false };
    var status = pending[title] || mark.status;
    box.querySelectorAll('[role="radio"]').forEach(function (b, i) {
      var option = OPTIONS[i];
      var on = option.status === status;
      var changed = on && mark.changed && status === mark.status;
      setAttr(b, 'aria-checked', String(on));
      setAttr(b, 'tabindex', on ? '0' : '-1');
      setAttr(b, 'data-changed', String(changed));
      setAttr(b, 'title', changed ? option.changed : option.label);
      setAttr(b, 'aria-label', changed ? option.changed : option.label);
    });
    paintNote(box, title);
  };
  var choose = function (status) {
    var title = currentTitle();
    var mark = state.marks[title] || { status: 'new', changed: false };
    if (!title || (mark.status === status && !mark.changed && !pending[title])) return;
    pending[title] = status;
    paint();
    post(CONFIG.setRoute, { title: title, status: status })
      .catch(function (error) { document.getElementById(CONFIG.id).title = error.message; })
      .then(function () { delete pending[title]; paint(); });
  };
  var buildStatus = function () {
    var group = document.createElement('div');
    group.className = 'toolbar__group toolbar__group--segmented review-status';
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', 'Review status');
    OPTIONS.forEach(function (option) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('data-status', option.status);
      b.innerHTML = svg(option.icon) + '<span class="review-status__changed" aria-hidden="true"></span>';
      b.addEventListener('click', function () { choose(option.status); });
      group.appendChild(b);
    });
    group.addEventListener('keydown', function (e) {
      var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!step) return;
      e.preventDefault();
      var radios = Array.prototype.slice.call(group.children);
      var next = radios[(radios.indexOf(document.activeElement) + step + radios.length) % radios.length];
      next.focus();
      choose(next.getAttribute('data-status'));
    });
    return group;
  };
  var mount = function () {
    queued = false;
    var bar = document.querySelector('header.toolbar');
    var box = document.getElementById(CONFIG.id);
    if (!bar || !state || !currentTitle()) {
      if (box) box.hidden = true;
      return;
    }
    if (!box || box.parentElement !== bar) {
      if (box) box.remove();
      box = document.createElement('div');
      box.id = CONFIG.id;
      box.className = 'review-control';
      box.appendChild(buildStatus());
      buildNote(box);
      bar.insertBefore(box, bar.querySelector('.toolbar__spacer'));
    }
    box.hidden = false;
    paint();
  };
  var schedule = function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(mount);
  };
  window.addEventListener(CONFIG.event, function (e) {
    state = Object.assign({ marks: {}, notes: {} }, e.detail);
    schedule();
  });
  window.addEventListener('hashchange', schedule);
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
`;

export { CONTROL_BASE, NOTE_BODY, STATUS_BODY };
