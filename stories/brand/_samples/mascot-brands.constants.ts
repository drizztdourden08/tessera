/* @layer stories @kind data */
import { BRAND_APPS, BRAND_FAMILY } from '../../../src/brand';
import type { AnimatedMascotBrand } from '../../../src/brand';

const MASCOT_BRANDS = BRAND_APPS.filter((app) => BRAND_FAMILY[app].mascot !== undefined);

const ANIMATED_BRANDS = MASCOT_BRANDS.filter((app): app is AnimatedMascotBrand => BRAND_FAMILY[app].mascot?.motion !== undefined);

const MASCOT_VARIANT_IDS = MASCOT_BRANDS.flatMap((app) => BRAND_FAMILY[app].mascot?.variants.map((v) => v.id) ?? []);

const BREAKDOWN_SCALE = { piece: 3, scene: 3 };

export { ANIMATED_BRANDS, BREAKDOWN_SCALE, MASCOT_BRANDS, MASCOT_VARIANT_IDS };
