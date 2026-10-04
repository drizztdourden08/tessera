/* @layer stories @kind component */
import { Box, CodeBlock, Paragraph } from '../../../src/primitives';
import { PreviewList } from './PreviewList';
import type { PreviewUsageViewProps } from './preview-shared.type';
import './preview.css';

const PreviewUsageView = ({ name, usage }: PreviewUsageViewProps) => (
  <Box className="preview-usage">
    <Paragraph className="preview-usage__job">{usage.job}</Paragraph>
    <Box className="preview-usage__grid">
      <PreviewList title={`Use ${name} when`} lines={usage.useWhen} />
      <PreviewList title="Use something else when" lines={usage.avoidWhen.map((alt) => `${alt.case} Use ${alt.use}.`)} />
      <PreviewList title="Rules" lines={usage.rules} />
      <PreviewList title="Access" lines={usage.a11y} />
    </Box>
    <CodeBlock code={usage.example} language="tsx" />
  </Box>
);

export { PreviewUsageView };
