/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { SURFACE_SELECTOR } from '../DropdownMenu.constants';
import { measureJoin } from './measure-join';
import { squareParentCorners } from './square-parent-corners';
import { NOT_JOINED } from './useSubMenuJoin.constants';
import type { SubMenuJoinState } from './useSubMenuJoin.type';

const useSubMenuJoin = (rowRef: RefObject<HTMLElement | null>, panelRef: RefObject<HTMLElement | null>): SubMenuJoinState => {
  const [state, setState] = useState<SubMenuJoinState>(NOT_JOINED);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const panel = panelRef.current;
    const parent = row?.closest<HTMLElement>(SURFACE_SELECTOR);
    if (!row || !panel || !parent) return undefined;
    const join = measureJoin(row, parent, panel);
    setState({ join, native: panel.hasAttribute('data-anchored') });
    return squareParentCorners(parent, join);
  }, [rowRef, panelRef]);

  return state;
};

export { useSubMenuJoin };
