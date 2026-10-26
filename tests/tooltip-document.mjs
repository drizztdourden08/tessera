/* @layer tooling-scripts @kind test */
const fakeDocument = () => {
  const listeners = new Map();
  const doc = {
    listeners,
    addEventListener: (type, listener) => listeners.set(type, listener),
    removeEventListener: (type, listener) => { if (listeners.get(type) === listener) listeners.delete(type); },
    fire: (type, event = {}) => listeners.get(type)?.(event),
  };
  return doc;
};

const fakeAnchor = (doc = fakeDocument()) => ({ current: { ownerDocument: doc } });

export { fakeAnchor, fakeDocument };
