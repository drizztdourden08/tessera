/* @layer stories @kind types */
import type { ManagedListProps } from '../../../src/composites';

interface SampleProfile {
  id: string;
  name: string;
  game: string;
  template: string;
}

interface ManagedListCreateDemoProps {
  firstRun?: boolean;
}

type SampleProfileList = Pick<
  ManagedListProps<SampleProfile>,
  'title' | 'items' | 'getId' | 'getName' | 'render' | 'createLabel' | 'createOpen' | 'onCreateOpenChange' | 'empty' | 'create'
> & { selectedId: string | null };

interface SampleProfiles {
  list: SampleProfileList;
  pick: (id: string) => void;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
}

export type { ManagedListCreateDemoProps, SampleProfile, SampleProfiles };
