/* @layer root-config @kind data */
import { TEXT_ELEMENT_SPECS } from '../src/primitives/text-elements/text-element-specs.constants';
import type { CatalogueTier } from './catalogue.type';

const TEXT_TIER: CatalogueTier = {
  tier: 'Core',
  intro: 'Every HTML text element and the six headings, each by full name or short name, on the Text and Title namespaces or on their own.',
  groups: [{
    group: 'Text',
    entries: [
      { name: 'Text', summary: 'The namespace for every text element, and plain text by variant.' },
      { name: 'All elements', summary: 'Every text element on one page.' },
      { name: 'Title', summary: 'H1 to H6 in the title face, built from one heading.' },
      { name: 'TextElement', summary: 'The element every Text member is built on, for a tag picked at run time.' },
      ...TEXT_ELEMENT_SPECS.map((spec) => ({
        name: spec.name,
        summary: spec.name === spec.short ? `The <${spec.tag}> element.` : `The <${spec.tag}> element, also ${spec.short}.`,
      })),
      { name: 'Shortcut', summary: 'Keycaps for a key, a key combination or a mouse button, also Sc.' },
      { name: 'Quote', summary: 'A quotation that follows where it sits, also Q: small marks in a sentence, a floating mark on its own.' },
      { name: 'Emphasis animation', summary: 'Emphasis: a word that swells along the weight axis on hover, on a flag, once or in a loop.' },
    ],
  }],
};

export { TEXT_TIER };
