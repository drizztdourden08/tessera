/* @layer tooling-scripts @kind test */
const run = { slots: [], at: 0, queued: [], changed: false };

const slot = (make) => {
  const index = run.at;
  run.at += 1;
  if (run.slots[index] === undefined) run.slots[index] = make();
  return run.slots[index];
};

const sameDeps = (before, after) => before !== undefined && before.length === after.length && after.every((dep, i) => Object.is(dep, before[i]));

const hooks = {
  useState: (initial) => {
    const cell = slot(() => ({ value: typeof initial === 'function' ? initial() : initial }));
    const set = (next) => {
      const value = typeof next === 'function' ? next(cell.value) : next;
      if (Object.is(value, cell.value)) return;
      cell.value = value;
      run.changed = true;
    };
    return [cell.value, set];
  },
  useRef: (initial) => slot(() => ({ current: initial })),
  useCallback: (callback) => callback,
  useMemo: (make) => make(),
  useEffect: (effect, deps) => {
    const cell = slot(() => ({}));
    if (sameDeps(cell.deps, deps)) return;
    cell.deps = deps;
    run.queued.push(() => {
      cell.cleanup?.();
      cell.cleanup = effect();
    });
  },
  useEffectEvent: (callback) => {
    const cell = slot(() => ({}));
    cell.callback = callback;
    cell.call ??= (...args) => cell.callback(...args);
    return cell.call;
  },
};

const mountHook = (first) => {
  let render = first;
  let current;
  run.slots = [];
  run.queued = [];
  const draw = () => {
    do {
      run.changed = false;
      run.at = 0;
      current = render();
      const effects = run.queued;
      run.queued = [];
      effects.forEach((effect) => effect());
    } while (run.changed);
  };
  draw();
  return {
    get current() {
      return current;
    },
    act: (press) => {
      press(current);
      if (run.changed) draw();
    },
    rerender: (next) => {
      render = next;
      draw();
    },
  };
};

export { hooks, mountHook };
