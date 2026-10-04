/* @layer stories @kind data */
import { BRAND_APPS, BRAND_FAMILY } from '../../../src/brand';
import type { AnimatedMascotBrand, MascotAnimationNames } from '../../../src/brand';

type AnyMascotAnimation = MascotAnimationNames[AnimatedMascotBrand];

const MASCOT_BRANDS = BRAND_APPS.filter((app) => BRAND_FAMILY[app].mascot !== undefined);

const ANIMATED_BRANDS = MASCOT_BRANDS.filter((app): app is AnimatedMascotBrand => BRAND_FAMILY[app].mascot?.motion !== undefined);

const MASCOT_VARIANT_IDS = MASCOT_BRANDS.flatMap((app) => BRAND_FAMILY[app].mascot?.variants.map((v) => v.id) ?? []);

const MASCOT_ANIMATIONS = [...new Set(ANIMATED_BRANDS.flatMap((app) => Object.keys(BRAND_FAMILY[app].mascot?.motion?.animations ?? {})))] as AnyMascotAnimation[];

const BREAKDOWN_SCALE = { piece: 3, scene: 3 };

export { ANIMATED_BRANDS, BREAKDOWN_SCALE, MASCOT_ANIMATIONS, MASCOT_BRANDS, MASCOT_VARIANT_IDS };
export type { AnyMascotAnimation };
