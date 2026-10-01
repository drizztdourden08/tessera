/* @layer renderer-components @kind component */
import { paintStyle } from '../behavior/paint-style';
import { share } from '../behavior/share';
import { toneOf } from '../behavior/tone-of';
import type { SecondaryFillProps } from './SecondaryFill.type';

const SecondaryFill = (props: SecondaryFillProps) => {
  const { value, max, tone, under } = props;
  if (value === undefined) return null;
  const paint = tone === undefined ? under ?? {} : { tone };
  return (
    <div
      className="progress-bar__fill progress-bar__fill--secondary"
      data-tone={toneOf(paint)}
      data-faded={tone === undefined ? 'yes' : undefined}
      style={paintStyle(paint, { width: `${share(value, max)}%` })}
    />
  );
};

export { SecondaryFill };
