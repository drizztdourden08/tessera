/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A vertical list of links to the sections of a long page, in titled groups, beside a line that fills as the reader scrolls.',
  useWhen: [
    'A long page, such as a website or a manual, has sections in groups and the reader needs to see where they are.',
    'The list sits in a side column that stays in view while the page scrolls.',
  ],
  avoidWhen: [
    { case: 'The sections are shown as pills in the header of a page.', use: 'HeaderAnchorNav' },
    { case: 'The list switches between the screens of a window.', use: 'SideNav' },
    { case: 'The steps of one task are shown with a done state.', use: 'Stepper' },
  ],
  rules: [
    'Pass groups, each with an id, a label and children; a child has an id, a label and the href of its section.',
    'Pass activeId for the section in view; the host owns it, as with HeaderAnchorNav.',
    'Pass onJump to follow a link yourself, such as a smooth scroll or a route; the browser then does not jump.',
    'Pass timeline="scroll" to fill the line from the scroll of the page, or a name such as "--page" for a view timeline you set on the sections.',
    'Set timeline-scope with that name on a common parent of the page and the timeline, so the line can read it.',
    'Without scroll-driven animation, or with reduced motion, the line jumps to progress, or to the active section when progress is left out.',
    'Pass progress from 0 to 1 when you track the scroll yourself; it wins over activeId.',
    'Pass state="idle" to dim it until the pointer or focus enters, and state="hidden" to remove it, such as on a narrow page.',
  ],
  a11y: [
    'It is a nav named by ariaLabel, holding a list of groups; each group is a list named by its title.',
    'The active link has aria-current="location"; a hidden timeline is out of the reading order.',
    'The line and its fill are decorative and hidden from screen readers.',
    'With reduced motion the fill jumps instead of animating, and it never runs a time-based animation.',
  ],
  tree: {
    path: ['navigation', 'between sections of one long page'],
    rule: 'SectionTimeline is the side list of a long page: grouped section links beside a line that fills as the page scrolls.',
  },
  example: `import { useState } from 'react';
import { SectionTimeline } from '@drizztdourden08/tessera';

const GROUPS = [
  { id: 'start', label: 'Start', children: [{ id: 'intro', label: 'Intro', href: '#intro' }, { id: 'setup', label: 'Setup', href: '#setup' }] },
  { id: 'play', label: 'Play', children: [{ id: 'rules', label: 'Rules', href: '#rules' }] },
];

const PageTimeline = () => {
  const [active, setActive] = useState('intro');
  return (
    <SectionTimeline
      ariaLabel="On this page"
      groups={GROUPS}
      activeId={active}
      timeline="scroll"
      onJump={(id) => {
        setActive(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }}
    />
  );
};
`,
  propsHash: 'b9e80ecf42362731',
} satisfies ComponentUsage;

export { usage };
