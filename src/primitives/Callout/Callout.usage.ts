/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A short note set apart from the text around it, such as a pre-release notice, a banner with a title and an action, or the fine print of a dialog.',
  useWhen: [
    'A note must stay on the page until the cause is gone, such as a pre-release notice or a failed install.',
    'A banner needs a bold first line, a short sentence and one action, such as Get the package.',
  ],
  avoidWhen: [
    { case: 'The message comes and goes on its own.', use: 'Toast' },
    { case: 'The note floats over the page and points at one thing.', use: 'SpeechBubble' },
    { case: 'Something failed to load and can be tried again.', use: 'LoadError' },
  ],
  rules: [
    'A banner is a Callout with a title: pass title for the bold first line and keep the children to one short sentence.',
    'Pick tone for the meaning: danger for a failure, warning for a risk, info for news, success for a thing that worked.',
    'Pass action for the one button the banner offers, and icon to lead the line; both are optional.',
    'Use variant footnote for fine print under a hairline; it takes no fill and is not for banners.',
    'Put long text or a raw error in details, which sits under the line across the whole box.',
  ],
  a11y: [
    'It is a note and adds no alert, so a screen reader reads it in place, title first and then the text.',
    'The title is a plain line, not a heading, so it does not change the outline of the page.',
    'The icon is decoration and is not announced; the tone is never the only carrier of the meaning.',
  ],
  tree: {
    path: ['feedback', 'a note that stays on the page'],
    rule: 'Callout is the one note in the flow of the page. A banner is a Callout with a title, and LoadError and ValidationSummary draw on it.',
  },
  example: `import { Button, Callout, Icon } from '@drizztdourden08/tessera';

const PackageBanner = ({ onGet }: { onGet: () => void }) => (
  <Callout
    tone="danger"
    title="The package could not be installed"
    icon={<Icon name="triangle-alert" size={16} />}
    action={<Button size="sm" variant="danger" onClick={onGet}>Get the package</Button>}
  >
    Check your connection and try again.
  </Callout>
);
`,
  propsHash: 'a4b0ec17aa363e4f',
} satisfies ComponentUsage;

export { usage };
