/* @layer stories @kind data */
import { BRAND_APPS, BRAND_FAMILY } from '../../../src/brand';

const MASCOT_BRANDS = BRAND_APPS.filter((app) => BRAND_FAMILY[app].mascot !== undefined);

const MASCOT_VARIANT_IDS = MASCOT_BRANDS.flatMap((app) => BRAND_FAMILY[app].mascot?.variants.map((v) => v.id) ?? []);

const BREAKDOWN_SCALE = { piece: 3, scene: 3 };

export { BREAKDOWN_SCALE, MASCOT_BRANDS, MASCOT_VARIANT_IDS };
