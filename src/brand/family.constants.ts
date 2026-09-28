/* @layer renderer-components @kind data */
import type { BrandApp, BrandInfo } from './brand.type';
import { ARCHIPELIA_MARK } from './marks/archipelia.constants';
import { BROCK_MARK } from './marks/brock.constants';
import { ROTP_MARK } from './marks/rotp.constants';
import { ROTP_MASCOT } from './marks/rotp-mascot.constants';
import { TESSERA_MARK } from './marks/tessera.constants';

const BRAND_FAMILY: Record<BrandApp, BrandInfo> = {
  tessera: {
    id: 'tessera',
    name: 'Tessera',
    kind: 'Design system · private package',
    colour: '#c9c9c9',
    colourName: 'Greys, on purpose',
    tile: '#ffffff',
    summary: 'Tokens, primitives, composites and the data engine every project shares. Grey because it has no colour of its own: it takes each project\'s palette.',
    placement: 'Every tile that is not coloured. Each is free for the next project.',
    mark: TESSERA_MARK,
    wordmark: { text: 'Tessera', colors: ['#f4f4f4', '#e2e2e2', '#c9c9c9', '#adadad'] },
  },
  rotp: {
    id: 'rotp',
    name: 'Relic of the Past',
    kind: 'App · public repo',
    colour: '#c8a84e',
    colourName: 'Gold, its primary colour',
    tile: '#12100e',
    summary: 'The desktop port of A Link to the Past where Tessera began. Every primitive and composite here was first built for it.',
    placement: 'Top left of the bar, where the T starts and where reading starts: the first project.',
    mark: ROTP_MARK,
    mascot: ROTP_MASCOT,
    wordmark: { text: 'RELIC of the PAST', colors: ['#ffe26e', '#ffd639', '#fcbb28', '#ffa200'] },
  },
  archipelia: {
    id: 'archipelia',
    name: 'Archipelia',
    kind: 'App · public repo',
    colour: '#7c4dff',
    colourName: 'Purple, from its logo',
    tile: '#ece6ff',
    summary: 'The Archipelago multiworld manager: games, presets, sessions and a live dashboard. The first app built on Brock and Tessera from day one.',
    placement: 'The middle of the stem, carried by everything below it.',
    mark: ARCHIPELIA_MARK,
    wordmark: { text: 'Archipelia', colors: ['#e2d8ff', '#c1a8ff', '#9d77ff', '#7c4dff'] },
  },
  brock: {
    id: 'brock',
    name: 'Brock',
    kind: 'Foundation packages and builder · private',
    colour: '#f0862b',
    colourName: 'Orange, its accent',
    tile: '#ffffff',
    summary: 'The base every new app starts from: window, IPC, storage, settings, stores, packaging and the app builder. It brings Tessera into each app.',
    placement: 'Low in the stem, because it is what the apps stand on.',
    mark: BROCK_MARK,
    wordmark: { text: 'Brock', colors: ['#ffb341', '#ff9416', '#f2760c', '#d65a04'] },
  },
};

const BRAND_APPS: readonly BrandApp[] = ['tessera', 'rotp', 'archipelia', 'brock'];

export { BRAND_APPS, BRAND_FAMILY };
