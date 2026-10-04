/* @layer stories @kind logic */

const optionLabel = (option: unknown): string =>
  (option === undefined || option === null || option === '' ? 'none' : String(option));

export { optionLabel };
