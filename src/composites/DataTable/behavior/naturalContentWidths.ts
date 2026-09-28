/* @layer renderer-components @kind logic */
import { CLONE_STYLE, HOST_STYLE } from './measure-natural-width.constants';

const naturalContentWidths = (elements: readonly HTMLElement[]): number[] => {
  const [first] = elements;
  if (!first) return [];

  const doc = first.ownerDocument;
  const host = doc.createElement('div');
  host.setAttribute('style', HOST_STYLE);

  const clones = elements.map((element) => {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.setAttribute('style', CLONE_STYLE);
    host.appendChild(clone);
    return clone;
  });

  doc.body.appendChild(host);
  const widths = clones.map((clone) => Math.ceil(clone.getBoundingClientRect().width));
  host.remove();

  return widths;
};

export { naturalContentWidths };
