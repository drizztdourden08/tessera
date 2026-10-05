/* @layer stories @kind types */
import type { ItemListProps } from '../../../src/composites';

interface SampleProfile {
  id: string;
  name: string;
  game: string;
  template: string;
}

interface ItemListCreateDemoProps {
  firstRun?: boolean;
}

type SampleProfileList = Pick<
  ItemListProps<SampleProfile>,
  'title' | 'items' | 'getId' | 'getName' | 'render' | 'createLabel' | 'createOpen' | 'onCreateOpenChange' | 'empty' | 'create'
> & { selectedId: string | null };

interface SampleProfiles {
  list: SampleProfileList;
  pick: (id: string) => void;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
}

export type { ItemListCreateDemoProps, SampleProfile, SampleProfiles };
