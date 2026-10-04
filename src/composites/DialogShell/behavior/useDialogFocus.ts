/* @layer renderer-components @kind hook */
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { tabbablesIn } from '../../../primitives/dom/tabbables-in';
import { bodyOf } from './body-of';
import { enterDialog } from './enter-dialog';
import { followsInPage } from './follows-in-page';
import { initialFocusOf } from './initial-focus-of';
import { keepInside } from './keep-inside';
import { restoreFocus } from './restore-focus';
import { tabTarget } from './tab-target';
import { useOpener } from './useOpener';
import type { DialogFocus, UseDialogFocusParams } from './useDialogFocus.type';

const useDialogFocus = (params: UseDialogFocusParams): DialogFocus => {
  const { open, scopeOf = bodyOf } = params;
  const [node, setNode] = useState<HTMLElement | null>(null);
  const nodeRef = useRef<HTMLElement | null>(null);
  const openerRef = useOpener(open, nodeRef);
  const latest = useRef({ ...params, scopeOf });
  latest.current = { ...params, scopeOf };
  const ref = useCallback((el: HTMLElement | null) => {
    nodeRef.current = el;
    setNode(el);
  }, []);
  const active = open ? node : null;

  useLayoutEffect(() => {
    if (!active) return undefined;
    const doc = ownerDocumentOf(active);
    const opener = openerRef.current;
    const leave = enterDialog(doc, active);
    if (!active.contains(doc.activeElement)) initialFocusOf(active, latest.current).focus();
    const guard = keepInside(active, latest.current.scopeOf(active));
    doc.addEventListener('focusin', guard);
    return () => {
      leave();
      doc.removeEventListener('focusin', guard);
      restoreFocus(doc, active, opener);
    };
  }, [active, openerRef]);

  const onKeyDown: DialogFocus['onKeyDown'] = (event) => {
    if (event.key !== 'Tab' || event.defaultPrevented || !active) return;
    const focused = ownerDocumentOf(active).activeElement;
    const target = tabTarget<Element>({
      stops: tabbablesIn(active), active: focused, backwards: event.shiftKey, container: active, inside: active.contains(focused), follows: followsInPage(focused),
    });
    if (!isHTMLElement(target)) return;
    event.preventDefault();
    target.focus();
  };

  return { node, ref, onKeyDown };
};

export { useDialogFocus };
