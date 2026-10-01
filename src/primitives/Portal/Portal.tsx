/* @layer renderer-components @kind component */
import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTesseraOverride } from '../TesseraProvider/behavior/useTesseraOverride';
import type { PortalLayer, PortalProps } from './Portal.type';
import { LAYERS } from './Portal.constants';
import { portalDocumentFor } from './behavior/portal-document-for';
import { useInBrowser } from './behavior/useInBrowser';

const getPortalRoot = (doc: Document): HTMLElement => {
  let root = doc.getElementById('portal-root');
  if (!root) {
    root = doc.createElement('div');
    root.id = 'portal-root';
    root.style.position = 'fixed';
    root.style.inset = '0';
    root.style.pointerEvents = 'none';
    root.style.zIndex = '9000';
    doc.body.appendChild(root);
  }
  return root;
};

const getLayerContainer = (doc: Document, layer: PortalLayer): HTMLElement => {
  const root = getPortalRoot(doc);
  const id = `portal-layer-${layer}`;
  let el = doc.getElementById(id);
  if (!el) {
    el = doc.createElement('div');
    el.id = id;
    el.style.position = 'absolute';
    el.style.inset = '0';
    el.style.pointerEvents = 'none';
    el.style.zIndex = String(LAYERS[layer]);
    root.appendChild(el);
  }
  return el;
};

const Portal = (props: PortalProps) => {
  const { layer, children } = props;
  const provided = useTesseraOverride('portalDocument');
  const anchorRef = useRef<HTMLTemplateElement>(null);
  const [anchorDoc, setAnchorDoc] = useState<Document | null>(null);
  const inBrowser = useInBrowser();

  useLayoutEffect(() => {
    setAnchorDoc(anchorRef.current?.ownerDocument ?? null);
  }, []);

  const doc = inBrowser ? portalDocumentFor(provided, anchorDoc, () => document) : null;
  return (
    <>
      <template ref={anchorRef} />
      {doc && createPortal(children, getLayerContainer(doc, layer))}
    </>
  );
};

export {
  Portal,
};
