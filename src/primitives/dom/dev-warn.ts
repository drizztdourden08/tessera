/* @layer renderer-components @kind util */
const devWarn = (message: string): void => {
  if (import.meta.env?.DEV === true) console.warn(`[tessera] ${message}`);
};

export { devWarn };
