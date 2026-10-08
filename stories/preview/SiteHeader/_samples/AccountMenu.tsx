/* @layer stories @kind component */
import { DropdownMenu } from '../../../../src/composites';
import type { MenuGroup } from '../../../../src/composites';
import { SITE_TEXT } from './site-samples.constants';

const ignore = () => undefined;

const GROUPS: MenuGroup[] = [{
  id: 'account',
  items: [
    { id: 'account', label: SITE_TEXT.account, icon: 'user', onSelect: ignore },
    { id: 'sign-out', label: SITE_TEXT.signOut, icon: 'log-out', onSelect: ignore },
  ],
}];

const AccountMenu = ({ compact = false }: { compact?: boolean }) => (
  <DropdownMenu groups={GROUPS} variant="ghost" size="sm" trigger={{ label: SITE_TEXT.person, icon: 'user', iconOnly: compact }} />
);

export { AccountMenu };
