/* @layer root-config @kind data */
const PROJECT_MODULE_ID = '\0virtual:storylite/project';

const IMPORTED_CSS_EXPORT = 'export const importedCss = [];';

const FRAME_CSS_SLOT = '__TESSERA_FRAME_CSS__';

const FRAME_CSS_SLOT_LITERAL = /(["'`])__TESSERA_FRAME_CSS__\1/;

const FRAME_CSS_START = '/* tessera:frame-css:start */';

const FRAME_CSS_END = '/* tessera:frame-css:end */';

const FRAME_CSS_REGISTRY = `const tesseraCssTarget = globalThis.window ?? globalThis;
const tesseraCssEntries = new Map();
const tesseraCssRegistry = tesseraCssTarget.__STORYLITE_IMPORTED_CSS__ ?? {
  set(id, css) { tesseraCssEntries.set(String(id), String(css ?? '')); },
  delete(id) { tesseraCssEntries.delete(String(id)); },
  toArray() { return Array.from(tesseraCssEntries.values()).filter(Boolean); },
};
tesseraCssTarget.__STORYLITE_IMPORTED_CSS__ = tesseraCssRegistry;
tesseraCssRegistry.set('tessera:frame-css', ${JSON.stringify(FRAME_CSS_SLOT)});
export const importedCss = tesseraCssRegistry.toArray();`;

export { FRAME_CSS_END, FRAME_CSS_REGISTRY, FRAME_CSS_SLOT_LITERAL, FRAME_CSS_START, IMPORTED_CSS_EXPORT, PROJECT_MODULE_ID };
