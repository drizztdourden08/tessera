/* @layer stories @kind component */
import { Box, CodeBlock } from '../../../src/primitives';
import type { GuideTopicViewProps } from './guide.type';
import { GuideText } from './GuideText';
import './GuideTopicView.css';

const GuideTopicView = (props: GuideTopicViewProps) => {
  const { points, code, language = 'tsx' } = props.topic;
  return (
    <Box className="guide-topic">
      <Box as="ul" className="overview__points">
        {points.map((point) => <Box as="li" key={point}><GuideText text={point} /></Box>)}
      </Box>
      {code !== undefined && <CodeBlock code={code} language={language} copyable />}
    </Box>
  );
};

export { GuideTopicView };
