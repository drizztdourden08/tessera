/* @layer renderer-components @kind logic */
const portalDocumentFor = (provided: Document | undefined, own: Document | null, fallback: () => Document): Document =>
  provided ?? own ?? fallback();

export { portalDocumentFor };
