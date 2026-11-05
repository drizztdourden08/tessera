/* @layer renderer-components @kind logic */
const focusFirstCell = (grid: HTMLElement | null): void => {
  grid?.querySelector<HTMLElement>('[data-choice-index]')?.focus();
};

export { focusFirstCell };
