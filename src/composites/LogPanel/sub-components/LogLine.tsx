/* @layer renderer-components @kind component */
import { Box, Span, Text } from '../../../primitives';
import { REVIEW_MASK } from '../../../primitives/dom/review-mask.constants';
import type { LogLineProps } from './LogLine.type';

const LogLine = (props: LogLineProps) => {
  const { row, kind } = props;
  const level = row.indent ?? 0;
  const tone = kind?.tone;

  return (
    <Box className="log-panel__row">
      <Text className="log-panel__gutter" {...REVIEW_MASK}>{row.gutter}</Text>
      <Box className={`log-panel__content${level > 0 ? ` log-panel__content--lvl${level}` : ''}`}>
        <Span tone={tone ?? 'muted'} className={`log-panel__tag log-panel__tag--${row.kind}`}>{row.tag}</Span>
        <Span tone={kind?.toneMessage === true ? tone : undefined} className={`log-panel__msg log-panel__msg--${row.kind}`}>
          {row.message}
        </Span>
      </Box>
    </Box>
  );
};

export { LogLine };
