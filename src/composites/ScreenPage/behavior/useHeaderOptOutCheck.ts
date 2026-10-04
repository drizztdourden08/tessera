/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { devWarn } from '../../../primitives/dom/dev-warn';
import { HEADER_KEYS, headerOptOut } from '../ScreenPage.constants';
import type { ScreenKind } from '../ScreenPage.type';

const useHeaderOptOutCheck = (owner: ScreenKind, props: object) => {
  const forced = HEADER_KEYS[owner].filter((key) => key in props).join(',');
  useEffect(() => {
    if (forced) devWarn(headerOptOut(owner, forced.split(',')));
  }, [forced, owner]);
};

export { useHeaderOptOutCheck };
