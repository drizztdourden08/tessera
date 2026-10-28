/* @layer tooling-scripts @kind test */
const listenerNode = (extra = {}) => {
  const listeners = new Map();
  return {
    listeners,
    addEventListener: (type, listener, options) => listeners.set(type, { listener, options }),
    removeEventListener: (type) => listeners.delete(type),
    ...extra,
  };
};

export { listenerNode };
