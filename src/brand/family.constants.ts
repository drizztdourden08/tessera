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
    appIcon: null,
    summary: 'Tokens, primitives, composites and the data engine every project shares. Grey because it has no colour of its own: it takes each project\'s palette.',
    placement: 'Every tile that is not coloured. Each is free for the next project.',
    mark: TESSERA_MARK,
    wordmark: { text: 'Tessera', colors: ['#f4f4f4', '#e2e2e2', '#c9c9c9', '#adadad'] },
    gradient: { angle: 160, stops: ['#3d3d42', '#232327', '#0e0e12'] },
    backdrop: {
      angle: 160,
      stops: ['#1c1c20', '#0e0e12'],
      glows: [
        { colour: '#c9c9c9', strength: 14, at: [78, 10], size: [42, 100] },
        { colour: '#8a8a96', strength: 18, at: [12, 96], size: [46, 110] },
        { colour: '#adadad', strength: 8, at: [97, 62], size: [26, 80] },
        { colour: '#e2e2e2', strength: 5, at: [34, 0], size: [34, 55] },
        { colour: '#3d3d42', strength: 40, at: [62, 96], size: [50, 90] },
        { colour: '#3d3d42', strength: 45, at: [44, 46], size: [90, 140] },
      ],
    },
  },
  rotp: {
    id: 'rotp',
    name: 'Relic of the Past',
    kind: 'App · public repo',
    colour: '#c8a84e',
    colourName: 'Gold, its primary colour',
    tile: '#12100e',
    appIcon: 'straight',
    summary: 'The desktop port of A Link to the Past where Tessera began. Every primitive and composite here was first built for it.',
    placement: 'Top left of the bar, where the T starts and where reading starts: the first project.',
    mark: ROTP_MARK,
    mascot: ROTP_MASCOT,
    wordmark: { text: 'RELIC of the PAST', colors: ['#ffe26e', '#ffd639', '#fcbb28', '#ffa200'] },
    gradient: { angle: 160, stops: ['#3a2e14', '#1e1810', '#12100e'] },
    backdrop: {
      angle: 160,
      stops: ['#1a150e', '#12100e'],
      glows: [
        { colour: '#c8a84e', strength: 30, at: [72, 14], size: [44, 110] },
        { colour: '#4a9966', strength: 22, at: [10, 98], size: [46, 110] },
        { colour: '#ffa200', strength: 13, at: [96, 66], size: [26, 85] },
        { colour: '#fcbb28', strength: 8, at: [36, 0], size: [36, 55] },
        { colour: '#3a2e14', strength: 55, at: [60, 100], size: [52, 90] },
        { colour: '#3a2e14', strength: 50, at: [46, 44], size: [90, 140] },
      ],
    },
  },
  archipelia: {
    id: 'archipelia',
    name: 'Archipelia',
    kind: 'App · public repo',
    colour: '#7c4dff',
    colourName: 'Purple, from its logo',
    tile: '#ece6ff',
    appIcon: 'tile',
    summary: 'The Archipelago multiworld manager: games, presets, sessions and a live dashboard. The first app built on Brock and Tessera from day one.',
    placement: 'The middle of the stem, carried by everything below it.',
    mark: ARCHIPELIA_MARK,
    wordmark: { text: 'Archipelia', colors: ['#e2d8ff', '#c1a8ff', '#9d77ff', '#7c4dff'] },
    gradient: { angle: 160, stops: ['#ece6ff', '#e2d8ff', '#c1a8ff'] },
    backdrop: {
      angle: 160,
      stops: ['#18122a', '#0d0b14'],
      glows: [
        { colour: '#7c4dff', strength: 30, at: [70, 16], size: [44, 110] },
        { colour: '#9d77ff', strength: 18, at: [8, 96], size: [46, 110] },
        { colour: '#c1a8ff', strength: 10, at: [97, 70], size: [26, 85] },
        { colour: '#e2d8ff', strength: 5, at: [30, 0], size: [34, 55] },
        { colour: '#2a1d55', strength: 55, at: [58, 100], size: [52, 90] },
        { colour: '#2a1d55', strength: 50, at: [42, 48], size: [90, 140] },
      ],
    },
  },
  brock: {
    id: 'brock',
    name: 'Brock',
    kind: 'Foundation packages and builder · private',
    colour: '#f0862b',
    colourName: 'Orange, its accent',
    tile: '#ffffff',
    appIcon: 'straight',
    summary: 'The base every new app starts from: window, IPC, storage, settings, stores, packaging and the app builder. It brings Tessera into each app.',
    placement: 'Low in the stem, because it is what the apps stand on.',
    mark: BROCK_MARK,
    wordmark: { text: 'Brock', colors: ['#ffb341', '#ff9416', '#f2760c', '#d65a04'] },
    gradient: { angle: 160, stops: ['#ffc66e', '#ffb341', '#ff9416'] },
    backdrop: {
      angle: 160,
      stops: ['#1e140b', '#100b07'],
      glows: [
        { colour: '#f0862b', strength: 28, at: [74, 12], size: [44, 110] },
        { colour: '#d65a04', strength: 22, at: [14, 98], size: [46, 110] },
        { colour: '#ffb341', strength: 11, at: [96, 64], size: [26, 85] },
        { colour: '#ffc66e', strength: 6, at: [38, 0], size: [34, 55] },
        { colour: '#3d240e', strength: 55, at: [62, 100], size: [52, 90] },
        { colour: '#3d240e', strength: 50, at: [46, 46], size: [90, 140] },
      ],
    },
  },
};

const BRAND_APPS: readonly BrandApp[] = ['tessera', 'rotp', 'archipelia', 'brock'];

export { BRAND_APPS, BRAND_FAMILY };
