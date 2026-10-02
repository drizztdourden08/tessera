/* @layer root-config @kind data */
import type { CatalogueTier } from './catalogue.type';

const SETUP_TIER: CatalogueTier = {
  tier: 'Core',
  intro: 'How an app sets Tessera up, and where its own parts go.',
  groups: [{
    group: 'Setup',
    entries: [
      { name: 'Setup', summary: 'Install, tokens then the app theme, the palette, the provider at the root, fonts and the gallery.' },
      { name: 'TesseraProvider', summary: 'Swaps Tessera parts, from the spinner to the wording and icons, for ones the app brings, once at the root.' },
      { name: 'Building compounds', summary: 'The app\'s own parts for its concepts, made of Tessera parts.' },
      { name: 'Building views', summary: 'The app\'s screens: state, stores, IPC and the router, handed down as props.' },
      { name: 'App primitives and composites', summary: 'A part only one app needs. Not recommended; when needed, it follows Tessera\'s rules.' },
    ],
  }],
};

export { SETUP_TIER };
