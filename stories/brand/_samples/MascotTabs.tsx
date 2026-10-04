/* @layer stories @kind component */
import { BRAND_FAMILY, Mascot } from '../../../src/brand';
import type { AnimatedMascotBrand } from '../../../src/brand';
import { Tabs } from '../../../src/primitives';
import { MASCOT_TABS } from './mascot-tab.constants';
import { useMascotTab } from './useMascotTab';

const TABS = MASCOT_TABS.map((brand) => ({
  id: brand,
  label: BRAND_FAMILY[brand].mascot?.name ?? brand,
  icon: <Mascot brand={brand} size="md" title="" />,
}));

const isTab = (id: string): id is AnimatedMascotBrand => MASCOT_TABS.some((tab) => tab === id);

const MascotTabs = () => {
  const [brand, choose] = useMascotTab();
  return <Tabs tabs={TABS} activeTab={brand} onTabChange={(id) => { if (isTab(id)) choose(id); }} />;
};

export { MascotTabs };
