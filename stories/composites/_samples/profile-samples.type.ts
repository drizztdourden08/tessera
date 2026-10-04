/* @layer stories @kind types */
interface SampleProfile {
  id: string;
  name: string;
  game: string;
  template: string;
}

interface ManagedListCreateDemoProps {
  firstRun?: boolean;
}

export type { ManagedListCreateDemoProps, SampleProfile };
