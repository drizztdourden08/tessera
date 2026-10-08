/* @layer stories @kind data */
import type { WindowTitleBarDropdownAction } from '../../../src/composites';
import { SITE_TEXT } from './site-samples.constants';

const ignore = (): void => undefined;

const HOOKSHOP_PROFILE: WindowTitleBarDropdownAction = {
  id: 'profile',
  icon: 'user',
  label: SITE_TEXT.person,
  bar: 'dropdown',
  tone: 'primary',
  groups: [{
    id: 'person',
    label: SITE_TEXT.person,
    items: [
      { id: 'account', label: SITE_TEXT.account, icon: 'user', onSelect: ignore },
      { id: 'publications', label: SITE_TEXT.publications, icon: 'package', onSelect: ignore },
      { id: 'sign-out', label: SITE_TEXT.signOut, icon: 'log-out', onSelect: ignore },
    ],
  }],
};

export { HOOKSHOP_PROFILE };
