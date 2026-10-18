/* @layer renderer-components @kind logic */
const railOverflows = (box: HTMLElement, list: HTMLElement): boolean => list.offsetHeight > box.clientHeight + 1;

export { railOverflows };
