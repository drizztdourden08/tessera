/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { HEADER_SELECTOR } from '../ScreenPage.constants';
import { headerSpace } from './header-space';
import { stackOf } from './stack-of';
import type { HeaderStack } from './stack-of.type';

const useStackedHeader = (root: HTMLElement | null, parts: string): HeaderStack => {
  const [stack, setStack] = useState<HeaderStack>('row');

  useLayoutEffect(() => {
    const header = root?.querySelector<HTMLElement>(HEADER_SELECTOR);
    if (!header) return undefined;
    const update = () => setStack(stackOf(headerSpace(header)));
    update();
    return observeResize([header, ...header.children], update);
  }, [root, parts]);

  return stack;
};

export { useStackedHeader };
