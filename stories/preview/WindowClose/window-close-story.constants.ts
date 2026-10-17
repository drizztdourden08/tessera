/* @layer stories @kind data */
import type { PreviewCardEntry } from '../_shared/preview-card.type';

const CLOSE_SPACE: readonly PreviewCardEntry[] = [
  { name: 'Today', badge: '0 px', text: 'The title row DATA and its X take 39 px, then a 16 px gap, before the side nav and the Profiles header start.' },
  { name: 'A, B and C', badge: '55 px', tone: 'success', text: 'The side nav and the Profiles header start 55 px higher, and the page body grows from 381 to 436 px in this 640 px frame. The X lives outside the card.' },
  { name: 'D', badge: '55 px', tone: 'success', text: 'The same 55 px come back. The Profiles header keeps its 64 px height with the 39 px X at its end.' },
];

const CLOSE_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. The X at the end of the switch row',
    badge: 'Considered',
    text: 'A round X the height of the switch, on the same line at the card\'s right edge, drawn like the switch. Easy to find at the top right, as on most windows, and it never covers the page. It sits apart from the switch, so the top line reads as two things.',
  },
  {
    name: 'B. The X joined to the switch',
    badge: 'Considered',
    text: 'One pill: Game, Data, Hookshop, a thin line, then X. All the window controls sit in one place at the top middle, and nothing hangs off the card. The X is far from the usual top right corner and makes the pill a little wider.',
  },
  {
    name: 'C. A small X on the corner',
    badge: 'Considered',
    text: 'A 24 px round button half over the card\'s top right corner, drawn like CollapseToggle. Where people look for a close button, and the smallest of the four. Small to hit with a mouse, though its hit area is 28 px, and it covers a sliver of the page header.',
  },
  {
    name: 'D. The X in the page header',
    badge: 'Considered',
    text: 'The X goes to the end of the first page row, after the header actions, as ScreenWindow does today with header. No new chrome, but every page frame (ScreenPage, SettingsPage, a full bleed page) has to make room for it, and it moves when a page has no header.',
  },
];

const CLOSE_CODE = `// A sketch of the change, not a released API
<ScreenWindow title="Data" titleRow={false} close="switch-row" floating={<FloatingSwitch ... />} onClose={close}>
  <SideNavLayout nav={...}>
    <ScreenPage icon={<Icon name="users" />} title="Profiles">...</ScreenPage>
  </SideNavLayout>
</ScreenWindow>`;

export { CLOSE_CHOICES, CLOSE_CODE, CLOSE_SPACE };
