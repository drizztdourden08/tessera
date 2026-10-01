/* @layer renderer-components @kind component */
import { Span } from '../../text-elements';
import { paintStyle } from '../behavior/paint-style';
import { toneOf } from '../behavior/tone-of';
import type { ProgressLegendProps } from './ProgressLegend.type';

const ProgressLegend = (props: ProgressLegendProps) => {
  const { parts } = props;
  return (
    <ul className="progress-bar__legend">
      {parts.map((part) => (
        <li key={part.label} className="progress-bar__key">
          <span className="progress-bar__swatch" data-tone={toneOf(part)} style={paintStyle(part, {})} aria-hidden />
          <Span tone="dim">{part.label}</Span>
          <Span className="progress-bar__amount">{part.value}</Span>
        </li>
      ))}
    </ul>
  );
};

export { ProgressLegend };
