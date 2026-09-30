/* @layer renderer-components @kind util */
const foldText = (text: string): string =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

export { foldText };
