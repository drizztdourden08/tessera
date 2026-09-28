/* @layer root-config @kind data */
import { TEXT_ELEMENT_SPECS } from '../src/primitives/text-elements/text-element-specs.constants';
import type { CatalogueTier } from './catalogue.type';

const TEXT_TIER: CatalogueTier = {
  tier: 'Text',
  intro: 'Every HTML text element and the six headings, each by full name or short name, on the Text and Title namespaces or on their own.',
  groups: [{
    group: '',
    entries: [
      { name: 'All elements', summary: 'Every text element on one page.' },
      { name: 'Title', summary: 'H1 to H6 in the title face, built from one heading.' },
      ...TEXT_ELEMENT_SPECS.map((spec) => ({
        name: spec.name,
        summary: spec.name === spec.short ? `The <${spec.tag}> element.` : `The <${spec.tag}> element, also ${spec.short}.`,
      })),
      { name: 'Shortcut', summary: 'Keycaps for a key, a key combination or a mouse button, also Sc.' },
      { name: 'Quote', summary: 'A quotation that follows where it sits, also Q: small marks in a sentence, a floating mark on its own.' },
      { name: 'CodeBlock', summary: 'Highlighted code in a panel, with line marks, numbers and a copy button.' },
    ],
  }],
};

export { TEXT_TIER };
