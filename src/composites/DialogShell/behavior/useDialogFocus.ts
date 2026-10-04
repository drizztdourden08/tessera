/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import { isNode } from '../../../primitives/Portal/behavior/is-node';
import { PORTAL_ROOT_SELECTOR } from '../DialogShell.constants';
import { enterDialog } from './enter-dialog';
import { initialFocusOf } from './initial-focus-of';
import { isTopDialog } from './is-top-dialog';
import { restoreFocus } from './restore-focus';
import { tabTarget } from './tab-target';
import { useOpener } from './useOpener';
import type { DialogFocus, UseDialogFocusParams } from './useDialogFocus.type';

const keepInside = (doc: Document, dialog: HTMLElement) => (event: FocusEvent): void => {
  const { target } = event;
  if (!target || !isTopDialog(doc, dialog) || !isNode(target) || dialog.contains(target)) return;
  if (dialog.closest(PORTAL_ROOT_SELECTOR)?.contains(target)) return;
  (tabbablesIn(dialog)[0] ?? dialog).focus();
};

const useDialogFocus = (params: UseDialogFocusParams): DialogFocus => {
  const { open, initialFocusRef, initialFocus } = params;
  const [node, setNode] = useState<HTMLElement | null>(null);
  const nodeRef = useRef<HTMLElement | null>(null);
  const openerRef = useOpener(open, nodeRef);
  const latest = useRef({ initialFocusRef, initialFocus });
  latest.current = { initialFocusRef, initialFocus };
  const ref = useCallback((el: HTMLElement | null) => {
    nodeRef.current = el;
    setNode(el);
  }, []);

  useLayoutEffect(() => {
    if (!node) return undefined;
    const doc = ownerDocumentOf(node);
    const opener = openerRef.current;
    const leave = enterDialog(doc, node);
    if (!node.contains(doc.activeElement)) initialFocusOf(node, latest.current.initialFocusRef, latest.current.initialFocus).focus();
    const guard = keepInside(doc, node);
    doc.addEventListener('focusin', guard);
    return () => {
      leave();
      doc.removeEventListener('focusin', guard);
      restoreFocus(doc, node, opener);
    };
  }, [node, openerRef]);

  const onKeyDown: DialogFocus['onKeyDown'] = (event) => {
    if (event.key !== 'Tab' || event.defaultPrevented || !node) return;
    const active = ownerDocumentOf(node).activeElement;
    const target = tabTarget<Element>({ stops: tabbablesIn(node), active, backwards: event.shiftKey, container: node, inside: node.contains(active) });
    if (!isHTMLElement(target)) return;
    event.preventDefault();
    target.focus();
  };

  return { node, ref, onKeyDown };
};

export { useDialogFocus };
