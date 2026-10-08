/* @layer tooling-scripts @kind test */
const escapeDocument = () => {
  const listeners = [];
  return {
    addEventListener: (type, fn, capture) => listeners.push({ type, fn, capture: capture === true }),
    removeEventListener: (type, fn, capture) => {
      const at = listeners.findIndex((entry) => entry.type === type && entry.fn === fn && entry.capture === (capture === true));
      if (at !== -1) listeners.splice(at, 1);
    },
    press: (key, handled = false, target = null) => {
      const event = {
        key,
        target,
        defaultPrevented: handled,
        stopped: false,
        preventDefault() { this.defaultPrevented = true; },
        stopPropagation() { this.stopped = true; },
        stopImmediatePropagation() { this.stopped = true; },
      };
      for (const entry of [...listeners]) if (entry.type === 'keydown' && !event.stopped) entry.fn(event);
      return event;
    },
    count: () => listeners.length,
  };
};

export { escapeDocument };
