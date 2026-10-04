/* @layer root-config @kind data */
import { COMPOSITES_TIER } from './catalogue-composites.constants';
import { PRIMITIVES_TIER } from './catalogue-primitives.constants';
import { SETUP_TIER } from './catalogue-setup.constants';
import { TEXT_TIER } from './catalogue-text.constants';
import { withUsageJobs } from './catalogue-jobs';
import type { CatalogueTier } from './catalogue.type';
import { ROOT } from './config.constants';

const CATALOGUE: readonly CatalogueTier[] = withUsageJobs(ROOT, [
  SETUP_TIER,
  {
    tier: 'Core',
    intro: 'Every mark in the family. Apps import theirs from the design system: `<Logo brand="archipelia" />`.',
    groups: [{
      group: 'Brand',
      entries: [
        { name: 'Brand', summary: 'The family on one page: each app\'s mark at every size, its mascot, its wordmark and what it is.' },
        { name: 'InteractiveTessera', summary: 'The mosaic T, interactive: pick a coloured tile to see its project. The home page shows it too.' },
        { name: 'Logo', summary: 'An app\'s mark alone at each size, its app icon, and the PNG and .ico files built from it.' },
        { name: 'WordMark', summary: 'An app\'s name in the pixel alphabet, in the brand\'s own colours.' },
        { name: 'Combined', summary: 'Mark and wordmark together, inline for a header or stacked for a splash.' },
        { name: 'Mascot', summary: 'An app\'s mascot built in code from its pieces, its variants and poses, and the assembly step by step.' },
      ],
    }],
  },
  {
    tier: 'Core',
    intro: 'The colour system: the seeds, the palettes built from them, the roles components use, and each brand\'s gradient.',
    groups: [{
      group: 'Colours',
      entries: [
        { name: 'Swatches', summary: 'The three seeds, and the white and black every palette runs between.' },
        { name: 'Palettes', summary: 'Each seed as eleven steps, and the grey scale.' },
        { name: 'Roles', summary: 'Every colour role with the value the page paints right now.' },
        { name: 'Contrast', summary: 'Text-on-fill pairs measured live, with a pass or fail per pair.' },
        { name: 'Gradients', summary: 'Each brand\'s gradient behind its mark and its backdrop, with their tokens.' },
      ],
    }],
  },
  {
    tier: 'Core',
    intro: 'Fonts, weights, sizes, and how text is cased, spaced and set.',
    groups: [{
      group: 'Typography',
      entries: [
        { name: 'Fonts', summary: 'Inter, Chakra Petch, mono, emoji and the game face, with the title and game specimens.' },
        { name: 'Weights', summary: 'Nine named weights on a continuous 100 to 900 axis, and a playground.' },
        { name: 'Sizes', summary: 'The type sizes, each a step of the size scale.' },
        { name: 'Optical size and italic', summary: 'Inter\'s optical size axis and its true italic.' },
        { name: 'OpenType features', summary: 'Every feature Inter ships, off and on, and a playground.' },
        { name: 'Transform and style', summary: 'Case, italic, letter spacing and line height.' },
      ],
    }],
  },
  TEXT_TIER,
  {
    tier: 'Core',
    intro: 'One icon system for every app: a named Lucide set through @iconify, and the brand marks as icons.',
    groups: [{
      group: 'Icons',
      entries: [
        { name: 'Icon', summary: 'A named icon, or any @iconify icon, with size, rotation, flip and a label.' },
        { name: 'Brand icons', summary: 'Every brand mark as an icon, in colour or one colour: Icon.Brand.' },
        { name: 'Glyph', summary: 'The small stroke glyphs the components draw.' },
        { name: 'InputIcon', summary: 'Controller buttons, sticks, triggers and keyboard keys by family, for button prompts.' },
        { name: 'PathIcon', summary: 'An SVG from your own path data, for a one-off shape.' },
        { name: 'EmojiIcon', summary: 'An emoji at a fixed size and baseline.' },
      ],
    }],
  },
  {
    tier: 'Core',
    intro: 'The values every component is drawn from. They follow the app picked in the toolbar.',
    groups: [{
      group: 'Tokens',
      entries: [
        { name: 'Size scale', summary: 'The one scale every length is a step of, smallest to biggest.' },
        { name: 'Sizes', summary: 'Fixed widths, heights and diameters, by what they size.' },
        { name: 'Margin', summary: 'The spacing scale as margin.' },
        { name: 'Padding', summary: 'The spacing scale as padding.' },
        { name: 'Gap', summary: 'The spacing scale as gap.' },
        { name: 'Radius', summary: 'Every corner radius, from chips to circles.' },
        { name: 'Shadows', summary: 'Elevation, from a resting card to an overlay.' },
        { name: 'Z-index', summary: 'The stacking layers, lowest to highest.' },
        { name: 'Durations', summary: 'How long motion lasts.' },
        { name: 'Easings', summary: 'The curves motion follows.' },
        { name: 'Transitions', summary: 'A duration and an easing, paired.' },
      ],
    }],
  },
  PRIMITIVES_TIER,
  COMPOSITES_TIER,
  {
    tier: 'Data',
    intro: 'The headless engine under the data composites: schema, tables, filters and view state.',
    groups: [{ group: '', entries: [{ name: 'Engine', summary: 'Schema derivation, the table hook, filters and view storage.' }] }],
  },
  {
    tier: 'Preview',
    intro: 'Prototypes waiting for approval. They live in the gallery only and are not part of the package.',
    groups: [{
      group: 'For approval',
      entries: [
        { name: 'Mascot stage', summary: 'Prototype: the mascots on a stage of any width, walking, turning and moving between clips, by command or on their own.' },
      ],
    }],
  },
]);

export { CATALOGUE };
