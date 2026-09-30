/* @layer renderer-components @kind util */
const scrollIntoList = (drop: HTMLElement, index: number): void => {
  const option = drop.querySelector(`[data-index="${index}"]`);
  const scroller = option?.closest('.listbox-drop__scroll');
  if (!option || !scroller) return;
  const header = scroller.querySelector('.listbox-header')?.getBoundingClientRect().height ?? 0;
  const view = scroller.getBoundingClientRect();
  const row = option.getBoundingClientRect();
  if (row.top < view.top + header) scroller.scrollTop -= view.top + header - row.top;
  else if (row.bottom > view.bottom) scroller.scrollTop += row.bottom - view.bottom;
};

export { scrollIntoList };
