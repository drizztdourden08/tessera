/* @layer renderer-components @kind util */
const scrollOptionIntoList = (list: HTMLElement, index: number): void => {
  const option = list.querySelector(`[data-index="${index}"]`);
  if (!option) return;
  const view = list.getBoundingClientRect();
  const row = option.getBoundingClientRect();
  if (row.top < view.top) list.scrollTop -= view.top - row.top;
  else if (row.bottom > view.bottom) list.scrollTop += row.bottom - view.bottom;
};

export { scrollOptionIntoList };
