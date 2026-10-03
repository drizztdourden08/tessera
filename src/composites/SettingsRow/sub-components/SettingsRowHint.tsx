/* @layer renderer-components @kind component */
import { HintLine } from '../../../primitives/HintLine';
import { useHint } from '../../../primitives/hint/useHint';
import type { SettingsRowHintProps } from './SettingsRowHint.type';

const SettingsRowHint = (props: SettingsRowHintProps) => {
  const { current, idle } = props;
  const pointed = useHint();
  return <HintLine className="settings-row__hint" hint={pointed ?? current ?? null} idle={idle} lines={1} />;
};

export { SettingsRowHint };
