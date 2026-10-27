/* @layer renderer-components @kind util */
import type { SelectedTone } from '../../field-control/selected-tone.type';
import type { TabsProps } from '../Tabs.type';

const tabsClass = (size: NonNullable<TabsProps['size']>, tone: SelectedTone): string =>
  ['tabs', size === 'lg' && 'tabs--lg', tone === 'neutral' && 'tabs--neutral'].filter(Boolean).join(' ');

export { tabsClass };
