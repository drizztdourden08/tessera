/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'One row of small toned chips, each an icon with a count, that never wraps: what does not fit folds into a +N chip whose tooltip lists the hidden ones.',
  useWhen: [
    'A card or a header carries a few attention signals, such as open questions, failing tests or blockers, and must keep to one line.',
    'Some signals open a place when pressed and others only inform.',
  ],
  avoidWhen: [
    { case: 'A single label or state is shown, with no row of signals.', use: 'Tag' },
    { case: 'The user picks one of several chips.', use: 'TagPicker' },
  ],
  rules: [
    'Pass items. An item has an id, an icon, a label, a tone and optionally a count and an onClick. The strip keeps no state.',
    'tone is danger, warning, info, success or neutral and sets the colour of the chip.',
    'A chip shows its icon and its count. An item without a count shows its label as text. The label is also the title of the chip.',
    'An item with onClick is a button chip. An item without it is a static chip.',
    'The row never wraps. It measures the chips and the room, and what does not fit folds into a +N chip. The tooltip of +N lists the hidden labels.',
    'max keeps at most that many chips before the +N chip, even when there is room for more.',
    'An empty items list renders nothing.',
  ],
  a11y: [
    'Pass aria-label to name the row as a group.',
    'A button chip is a Tab stop and is named by its label. The +N chip is a Tab stop and its tooltip opens on focus.',
    'Tone is never the only cue: each chip has an icon and a label.',
  ],
  tree: {
    path: ['a status, a count or a label', 'a row of attention chips that folds what does not fit'],
    rule: 'SignalStrip is the one-line row of attention chips that folds the overflow into a +N chip with a tooltip.',
  },
  example: `import { SignalStrip } from '@drizztdourden08/tessera';

const openQuestions = () => undefined;
const openTests = () => undefined;

const items = [
  { id: 'questions', icon: 'circle-help', count: 2, label: 'Open questions', tone: 'warning', onClick: openQuestions },
  { id: 'tests', icon: 'flask', count: 1, label: 'Failing tests', tone: 'danger', onClick: openTests },
  { id: 'quiet', icon: 'moon', label: 'Quiet', tone: 'neutral' },
] as const;

const Signals = () => <SignalStrip aria-label="Attention" items={items} />;
`,
  propsHash: 'abf57c227fe044fe',
} satisfies ComponentUsage;

export { usage };
