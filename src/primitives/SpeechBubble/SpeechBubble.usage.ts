/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A box that speaks, with an optional tail toward whoever says it or the part it is about, such as a mascot beside the search palette.',
  useWhen: [
    'A mascot or a guide explains something in a few lines and the tail shows who says it.',
    'A note must float over the page, on its own surface, and point at one thing.',
  ],
  avoidWhen: [
    { case: 'A note that sits in the flow of the page.', use: 'Callout' },
    { case: 'A hint for the control under the pointer or focus.', use: 'Tooltip' },
    { case: 'A walk through the screen, one part at a time.', use: 'GuidedTour' },
  ],
  rules: [
    'Pass pointer for the side the tail sits on, such as pointer="left" for a bubble to the right of its speaker; it defaults to none.',
    'Move the tail along its edge with pointerOffset, in pixels from the start of that edge; it defaults to the middle.',
    'The tail hangs outside the box, so leave about ten pixels of room on that side.',
    'Leave tone off for a neutral border, or pass a Callout tone to tint the fill and colour the border and the tail.',
    'The fill is opaque, so the bubble reads over any page; pass maxWidth for a narrower bubble than 320 pixels.',
    'Place it yourself, with absolute position or an Anchored part; it sets no position on the page.',
    'Extra attributes and the ref go to the box, so a bubble can be a dialog, a popover or a live status.',
  ],
  a11y: [
    'It adds no role. Pass role="status" for a bubble that speaks on its own, or role="dialog" with a label for one that takes focus.',
    'The tail is decoration and is not announced.',
  ],
  tree: {
    path: ['feedback', 'a note in a bubble with a tail'],
    rule: 'SpeechBubble is the one bubble with a tail: GuidedTour draws its step card on it, and a mascot speaks through it.',
  },
  example: `import { SpeechBubble } from '@drizztdourden08/tessera';

const SearchTip = () => (
  <SpeechBubble tone="info" pointer="left" pointerOffset={24} role="status">
    Type to search screens, settings and actions. Press Enter to open the first result.
  </SpeechBubble>
);
`,
  propsHash: '4e41226ec57f2d19',
} satisfies ComponentUsage;

export { usage };
