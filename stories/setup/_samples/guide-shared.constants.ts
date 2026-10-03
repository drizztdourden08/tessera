/* @layer stories @kind data */
import { GUIDE_LINKS } from './guide-links.constants';
import type { GuideTopic } from './guide.type';

const TIER_TOPIC: GuideTopic = {
  title: 'Which tier',
  points: [
    `Any app could use it: it belongs in Tessera. Ask for it instead of building it. See ${GUIDE_LINKS.appParts}.`,
    'It reads stores, calls IPC or navigates: a view.',
    'It draws one of the app\'s concepts and only draws it: a compound.',
    'Inside it, pick each Tessera part with the decision tree in `ai/decide.md`.',
    `The tiers are defined in ${GUIDE_LINKS.designSystem}.`,
  ],
};

const USAGE_TOPIC: GuideTopic = {
  title: 'Usage file and decision tree',
  points: [
    'Every app part has a `Name.usage.ts` in the same shape as a Tessera part, and the same rules hold. `brock tessera new` writes one with a sentence in each field to replace.',
    'It says what the part is for (`job`), when to use it (`useWhen`) and which part to use instead (`avoidWhen`): a Tessera part or another part of the app.',
    'It lists the `rules`, the `a11y` notes and a short `example` that type-checks against the app.',
    'It places the part in the decision tree with `tree.path`, or marks it a `buildingBlock` other parts are made from. The app adds its own answers to the tree in the module that `ai.tree` of `tessera.config.json` names.',
    '`propsHash` records the props the text was checked against. When the props change, `brock tessera check` gives the new hash to set once the usage is read again.',
    `\`brock tessera check\` runs the Tessera checks on every app part. \`ai.usage\` in \`tessera.config.json\` decides what a finding does: \`report\` lists it and passes, \`enforce\` fails. The standards extension runs the same checks. See ${GUIDE_LINKS.usingTessera}.`,
    '`brock tessera ai` writes the app guide to `ai/`: `decide.md` with the answers the app adds, `index.md` and a page per part, linked to the Tessera guide. People and AI readers pick a part from `decide.md`.',
  ],
  code: `const usage = {
  job: 'One save slot: its name, its game and when it was last played.',
  useWhen: ['A list of saves shows one row per slot.'],
  avoidWhen: [{ case: 'The row edits the save.', use: 'RecordEditor' }],
  rules: ['Show the slot name first. The game and the time are muted.'],
  a11y: ['The Open button names the slot it opens.'],
  tree: { path: ['a status, a count or a label', 'a label and its value'], rule: 'One save, read at a glance.' },
  example: '<SaveSlot save={save} onOpen={openSave} />',
  propsHash: '5a16a393dd9c0579',
} satisfies ComponentUsage;

export { usage };`,
  language: 'typescript',
};

const LINT_POINTS: readonly string[] = [
  '`local/no-raw-html`: no lowercase JSX such as `<div>`. Build from `Box`, `Text`, `Flex` and the other parts.',
  '`local/no-as-element-with-primitive`: no `as="button"` when Tessera has the part.',
  '`local/no-raw-color` and `local/no-static-inline-style`: styles live in the CSS file beside the component.',
  'Stylelint: tokens only in CSS. No hex, px or ms values.',
  'Shape: one export per file, types in `.type.ts`, constants in `.constants.ts`, a hook file named after its hook, and a component imports only its own CSS.',
  '`local/no-comments`: the file header and no other comment. `standards prose` checks the wording.',
  '`standards structure --check`: the folder shape above.',
];

export { LINT_POINTS, TIER_TOPIC, USAGE_TOPIC };
