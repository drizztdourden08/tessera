/* @layer renderer-components @kind util */
const scrollRowInto = (list: HTMLElement, row: HTMLElement): void => {
  const box = list.getBoundingClientRect();
  const at = row.getBoundingClientRect();
  if (at.top < box.top) list.scrollTop -= box.top - at.top;
  else if (at.bottom > box.bottom) list.scrollTop += at.bottom - box.bottom;
};

export { scrollRowInto };
