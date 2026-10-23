/* @layer renderer-components @kind util */
const gridInsertionAt = (list: HTMLElement | null, selector: string, x: number, y: number): number => {
  const items = list ? [...list.querySelectorAll<HTMLElement>(selector)] : [];
  const at = items.findIndex((item) => {
    const box = item.getBoundingClientRect();
    if (y < box.top) return true;
    return y <= box.top + box.height && x < box.left + box.width / 2;
  });
  return at < 0 ? items.length : at;
};

export { gridInsertionAt };
