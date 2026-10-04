/* @layer renderer-components @kind component */
import { share } from '../behavior/share';
import type { SecondaryFillProps } from './SecondaryFill.type';

const SecondaryFill = (props: SecondaryFillProps) => {
  const { value, max, tone, faded } = props;
  if (value === undefined) return null;
  return (
    <div
      className="progress-bar__fill progress-bar__fill--secondary"
      data-tone={tone}
      data-faded={faded ? 'yes' : undefined}
      style={{ width: `${share(value, max)}%` }}
    />
  );
};

export { SecondaryFill };
