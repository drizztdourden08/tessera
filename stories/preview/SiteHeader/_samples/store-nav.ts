/* @layer stories @kind logic */
import { createElement } from 'react';
import type { SideNavConfig, SideNavItem } from '../../../../src/composites';
import { Icon } from '../../../../src/primitives';
import { STORE_SECTIONS } from './site-samples.constants';
import type { StoreSection } from './site-story.type';

const itemOf = (section: StoreSection): SideNavItem => ({ id: section.id, label: section.label, icon: createElement(Icon, { name: section.icon }) });

const GROUP_ORDER = ['Hookshop', 'Kinds', 'You', 'Reviewer'];

const storeNav = (): SideNavConfig => {
  const [home, ...rest] = STORE_SECTIONS;
  return {
    home: home ? itemOf(home) : undefined,
    groups: GROUP_ORDER.map((label) => ({ id: label, label, items: rest.filter((section) => section.group === label).map(itemOf) })),
  };
};

export { storeNav };
