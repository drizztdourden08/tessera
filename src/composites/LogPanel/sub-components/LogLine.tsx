/* @layer renderer-components @kind component */
import { Box, Span, Text } from '../../../primitives';
import { REVIEW_MASK } from '../../../primitives/dom/review-mask.constants';
import { logInk } from '../behavior/log-ink';
import { lineTones } from '../behavior/line-tones';
import { rowSelectionProps } from '../behavior/row-selection-props';
import { AnsiText } from './AnsiText';
import type { LogLineProps } from './LogLine.type';

const LogLine = (props: LogLineProps) => {
  const { row, kind, selection, ansi = false } = props;
  const level = row.indent ?? 0;
  const tones = lineTones(row, kind);
  const tag = logInk(tones.tag, 'muted');
  const message = logInk(tones.message);
  const msgClass = [
    'log-panel__msg', `log-panel__msg--${row.kind}`,
    kind?.strong === true && 'log-panel__msg--strong',
    kind?.uppercase === true && 'log-panel__msg--upper',
    message.className,
  ].filter(Boolean).join(' ');

  return (
    <Box {...rowSelectionProps(row.id, selection)}>
      <Text className="log-panel__gutter" {...REVIEW_MASK}>{row.gutter}</Text>
      <Box className={`log-panel__content${level > 0 ? ` log-panel__content--lvl${level}` : ''}`}>
        <Span tone={tag.tone} style={tag.style} className={[`log-panel__tag log-panel__tag--${row.kind}`, tag.className].filter(Boolean).join(' ')}>
          {row.tag}
        </Span>
        <Span tone={message.tone} style={message.style} className={msgClass}>{ansi ? <AnsiText text={row.message} /> : row.message}</Span>
      </Box>
    </Box>
  );
};

export { LogLine };
