/* @layer root-config @kind types */
interface CatalogueEntry {
  name: string;
  summary: string;
}

interface CatalogueGroup {
  group: string;
  entries: readonly CatalogueEntry[];
}

interface CatalogueTier {
  tier: 'Core' | 'Primitives' | 'Composites' | 'Data';
  intro: string;
  groups: readonly CatalogueGroup[];
}

export type { CatalogueTier };
