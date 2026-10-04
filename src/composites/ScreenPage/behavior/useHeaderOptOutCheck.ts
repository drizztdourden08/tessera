/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { devWarn } from '../../../primitives/dom/dev-warn';
import { headerOptOut } from '../ScreenPage.constants';

const useHeaderOptOutCheck = (owner: string, props: object) => {
  const forced = 'pageHeader' in props;
  useEffect(() => {
    if (forced) devWarn(headerOptOut(owner));
  }, [forced, owner]);
};

export { useHeaderOptOutCheck };
