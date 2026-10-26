/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { SCROLL_ATTRIBUTE, SCROLL_DOCUMENT } from '../PageRoot.constants';

const useDocumentScroll = (): void => {
  useEffect(() => {
    const root = document.documentElement;
    const before = root.getAttribute(SCROLL_ATTRIBUTE);
    root.setAttribute(SCROLL_ATTRIBUTE, SCROLL_DOCUMENT);
    return () => {
      if (before === null) root.removeAttribute(SCROLL_ATTRIBUTE);
      else root.setAttribute(SCROLL_ATTRIBUTE, before);
    };
  }, []);
};

export { useDocumentScroll };
