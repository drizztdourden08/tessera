/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Small } from '../../../primitives/text-elements';
import { hintKey } from '../behavior/hint-key';
import { SettingsRowHintText } from './SettingsRowHintText';
import type { SettingsRowRestProps } from './SettingsRowRest.type';

const SettingsRowRest = (props: SettingsRowRestProps) => {
  const { hints, current } = props;
  if (hints.length === 0) return null;
  const currentKey = current === undefined ? undefined : hintKey(current);
  return (
    <Box className="settings-row__rest">
      {hints.map((hint) => {
        const now = hintKey(hint) === currentKey;
        return (
          <Small key={hintKey(hint)} className="settings-row__rest-line" data-current={now || undefined}>
            <SettingsRowHintText hint={hint} current={now} />
          </Small>
        );
      })}
    </Box>
  );
};

export { SettingsRowRest };
