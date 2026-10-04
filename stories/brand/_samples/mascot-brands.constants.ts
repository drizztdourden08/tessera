/* @layer stories @kind data */
import { BRAND_APPS, BRAND_FAMILY } from '../../../src/brand';

const MASCOT_VARIANT_IDS = ['mascot', ...BRAND_APPS.flatMap((app) => BRAND_FAMILY[app].mascot?.variants.slice(1).map((v) => v.id) ?? [])];

const BREAKDOWN_SCALE = { piece: 3, scene: 3 };

export { BREAKDOWN_SCALE, MASCOT_VARIANT_IDS };
