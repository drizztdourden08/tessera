/* @layer renderer-components @kind util */
const spanOf = (cell: Element): number => {
  const first = cell.firstElementChild?.getBoundingClientRect();
  const last = cell.lastElementChild?.getBoundingClientRect();
  return first && last ? last.right - first.left : 0;
};

const widestKeys = (list: HTMLElement): number =>
  Math.max(0, ...[...list.querySelectorAll('.shortcut-list__keys')].map(spanOf));

export { widestKeys };
