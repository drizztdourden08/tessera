/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../../../src/ai/usage.type';

const usage = {
  job: 'Renders its children into a shared layer above the page, by z-index token.',
  useWhen: ['A custom overlay has no trigger to anchor to and must sit above the page.'],
  avoidWhen: [{ case: 'The popup belongs to a trigger and should follow it.', use: 'Anchored' }],
  rules: ['Pick the layer by what the content is: modal, popover, toast or tooltip.'],
  a11y: ['The portal moves the DOM, not the focus. The content it holds manages its own focus.'],
  buildingBlock: true,
  example: `import { Portal } from '@drizztdourden08/tessera';

const Banner = ({ text }: { text: string }) => <Portal layer="toast">{text}</Portal>;
`,
  propsHash: 'eeedfd5e5fad445d',
} satisfies ComponentUsage;

export { usage };
