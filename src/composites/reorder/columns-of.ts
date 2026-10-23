/* @layer renderer-components @kind util */
const columnsOf = (list: HTMLElement | null, selector: string): number => {
  const items = list ? [...list.querySelectorAll<HTMLElement>(selector)] : [];
  const first = items[0];
  if (!first) return 1;
  const top = first.getBoundingClientRect().top;
  const below = items.findIndex((item) => item.getBoundingClientRect().top > top);
  return below < 0 ? items.length : below;
};

export { columnsOf };
