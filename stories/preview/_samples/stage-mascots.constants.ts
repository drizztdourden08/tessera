/* @layer stories @kind data */
import type { AnimatedMascotBrand } from '../../../src/brand';

type MascotKey = 'sentri' | 'flint' | 'pelago';

const STAGE_MASCOTS: readonly { key: MascotKey; brand: AnimatedMascotBrand; name: string }[] = [
  { key: 'sentri', brand: 'rotp', name: 'Sentri' },
  { key: 'flint', brand: 'brock', name: 'Flint' },
  { key: 'pelago', brand: 'archipelia', name: 'Pelago' },
];

const BRAND_OF: Readonly<Record<MascotKey, AnimatedMascotBrand>> = { sentri: 'rotp', flint: 'brock', pelago: 'archipelia' };

const NAME_OF: Readonly<Record<MascotKey, string>> = { sentri: 'Sentri', flint: 'Flint', pelago: 'Pelago' };

const MASCOT_OPTIONS = STAGE_MASCOTS.map((m) => ({ value: m.key, label: m.name }));

export { BRAND_OF, MASCOT_OPTIONS, NAME_OF, STAGE_MASCOTS };
export type { MascotKey };
