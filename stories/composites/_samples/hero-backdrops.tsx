/* @layer stories @kind data */
import type { HeroArt, HeroBackdrop } from '../../../src/composites';
import { brandLogoUri } from './brand-logo';
import { HeroCrestArt } from './HeroCrestArt';
import { HeroHillsScene } from './HeroHillsScene';
import { HERO_SAMPLE_URLS } from './hero-sample-urls.constants';

const HERO_BACKDROP_KEYS = ['brand', 'scene', 'png', 'svg', 'tile', 'colour', 'none'] as const;

type HeroBackdropKey = (typeof HERO_BACKDROP_KEYS)[number];

const HERO_ART_KEYS = ['image', 'node', 'none'] as const;

type HeroArtKey = (typeof HERO_ART_KEYS)[number];

const HERO_BACKDROPS: Record<HeroBackdropKey, HeroBackdrop | null | undefined> = {
  brand: undefined,
  scene: { kind: 'node', node: <HeroHillsScene /> },
  png: { kind: 'image', src: HERO_SAMPLE_URLS.night, fit: 'cover', position: 'center bottom', pixelated: true },
  svg: { kind: 'image', src: HERO_SAMPLE_URLS.dunes, fit: 'cover' },
  tile: { kind: 'image', src: HERO_SAMPLE_URLS.tile, fit: 'tile' },
  colour: { kind: 'color', color: '--c-tag-violet-dim' },
  none: null,
};

const HERO_ARTS: Record<HeroArtKey, HeroArt | null> = {
  image: { kind: 'image', src: brandLogoUri('rotp'), alt: '', pixelated: true },
  node: { kind: 'node', node: <HeroCrestArt /> },
  none: null,
};

export { HERO_ART_KEYS, HERO_ARTS, HERO_BACKDROP_KEYS, HERO_BACKDROPS };
export type { HeroArtKey, HeroBackdropKey };
