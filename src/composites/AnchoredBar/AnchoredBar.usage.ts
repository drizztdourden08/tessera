/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small bar or dialog kept beside a rectangle, clamped to its box and docked at an edge when the target scrolls out of view.',
  useWhen: [
    'A toolbar or a small form belongs to a selection on a canvas or a long page, such as a rename bar over a clip.',
    'The bar must stay reachable when its target scrolls away, or must follow it as the page moves.',
  ],
  avoidWhen: [
    { case: 'The panel only needs to sit beside a rectangle, with no clamp, dock or focus handling.', use: 'Anchored' },
    { case: 'The user must answer before the app goes on.', use: 'Dialog' },
  ],
  rules: [
    'Return the target box from anchorRect; return null while there is none and the bar stays hidden.',
    'Pass boundary, a ref, an element or a CSS selector, to clamp the bar inside a box, and subscribe to hear the scrolls and resizes of that box.',
    'Set placement to bottom-center or top-center to pick the side of the target; auto puts the bar below and flips it above when there is no room below.',
    'Set dock to keep the bar in view at an edge when the target is off screen, and dockedText to say why.',
    'Set inline when the bar sits in a scroll box instead of the top layer.',
    'Name the bar with label and pick role: dialog, alertdialog, toolbar or status.',
    'Pass initialFocus, a selector, to focus a control once the bar is placed, and onEscape to close it.',
    'Set error to draw the danger border while the input in the bar is refused.',
  ],
  a11y: [
    'The bar has the role you pass and a name from label; a dialog is not modal.',
    'Focus moves to initialFocus once the bar is placed, and goes back where it was when the bar closes.',
    'Escape runs onEscape and stops there, so a parent dialog stays open.',
    'The bar is hidden from the tab order until it is measured.',
  ],
  tree: {
    path: ['something over the page', 'a bar or small dialog kept beside a rectangle'],
    rule: 'AnchoredBar adds a clamp, a dock, follow and focus handling to Anchored, for a bar that belongs to a rectangle.',
  },
  example: `import { AnchoredBar, Button } from '@drizztdourden08/tessera';

const SelectionBar = ({ rect, close }: { rect: () => DOMRect | null; close: () => void }) => (
  <AnchoredBar anchorRect={rect} dock="bottom-center" role="toolbar" label="Selection" onEscape={close}>
    <Button size="sm">Apply</Button>
  </AnchoredBar>
);
`,
  propsHash: 'c259a5d03ff94263',
} satisfies ComponentUsage;

export { usage };
