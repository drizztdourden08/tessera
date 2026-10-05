/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';

const ancestorsOf = (node: Element, body: Element): Element[] => {
  const found: Element[] = [];
  for (let at = node.parentElement; at; at = at === body ? null : at.parentElement) found.push(at);
  return found;
};

const inertOutside = (keep: readonly Element[], body: Element): (() => void) => {
  const kept = new Set(keep);
  const inside = (node: Element): boolean => kept.has(node) || ancestorsOf(node, body).some((parent) => kept.has(parent));
  const ancestors = new Set(keep.flatMap((node) => ancestorsOf(node, body)).filter((parent) => !inside(parent)));
  const onPath = new Set<Element>([...ancestors, ...keep]);
  const made: HTMLElement[] = [];
  ancestors.forEach((parent) => {
    [...parent.children].forEach((child) => {
      if (onPath.has(child) || !isHTMLElement(child) || child.inert) return;
      child.inert = true;
      made.push(child);
    });
  });
  return () => made.forEach((node) => { node.inert = false; });
};

export { inertOutside };
