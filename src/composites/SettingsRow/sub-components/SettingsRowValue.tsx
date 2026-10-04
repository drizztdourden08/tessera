/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import type { SettingsRowValueProps } from './SettingsRowValue.type';

const SettingsRowValue = (props: SettingsRowValueProps) => {
  const { handlers, children } = props;
  return <Span className="settings-row__value" {...handlers}>{children}</Span>;
};

export { SettingsRowValue };
