/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A value the user often copies, such as an address, a seed or a key, shown with a copy button at its end.',
  useWhen: [
    'A room address, a seed, a fingerprint or an ID sits in a status bar, a card or a dialog.',
    'A long value has to fit one line and still be copied whole.',
  ],
  avoidWhen: [
    { case: 'The value has a label beside it, as one row of a readout.', use: 'StatRow' },
    { case: 'The text to copy is not on screen, such as debug info.', use: 'CopyButton' },
  ],
  rules: [
    'Pass label as a short lower case name, such as room address, so the button reads Copy room address.',
    'Set mono for codes, keys, addresses and numbers the user may read back character by character.',
    'Use truncate middle for keys and fingerprints, where the last characters tell two values apart.',
  ],
  a11y: [
    'The value and its button form a group named by label.',
    'A cut value is read whole by a screen reader and shown whole on hover.',
    'The button says Copied through a polite status region after a copy.',
  ],
  tree: {
    path: ['a status, a count or a label', 'a value to copy, such as an address or a key'],
    rule: 'CopyValue keeps the value selectable and puts the copy button at its end, with the same check and announcement as every copy.',
  },
  example: `import { CopyValue } from '@drizztdourden08/tessera';

const RoomAddress = ({ address }: { address: string }) => (
  <CopyValue value={address} label="room address" mono truncate="middle" />
);
`,
  propsHash: '2de5d1a6247cdda9',
} satisfies ComponentUsage;

export { usage };
