/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useHint } from '../../../primitives/hint/useHint';
import { Small } from '../../../primitives/text-elements';
import { hintKey } from '../behavior/hint-key';
import { hintShown } from '../behavior/hint-shown';
import { SettingsRowHintText } from './SettingsRowHintText';
import type { SettingsRowLineProps } from './SettingsRowLine.type';

const SettingsRowLine = (props: SettingsRowLineProps) => {
  const { resting, hints, pointed, quiet = false, rest } = props;
  const shown = hintShown(useHint() ?? pointed, rest);

  return (
    <Box className="settings-row__line" data-pointed={shown === undefined ? undefined : true}>
      <Small tone={quiet ? 'muted' : 'dim'} className="settings-row__resting">{resting}</Small>
      <Small className="settings-row__hint" role="status" aria-live="polite">
        {shown !== undefined && <SettingsRowHintText hint={shown} />}
      </Small>
      {hints.map((hint) => (
        <Small key={hintKey(hint)} className="settings-row__sizer" aria-hidden>
          <SettingsRowHintText hint={hint} />
        </Small>
      ))}
    </Box>
  );
};

export { SettingsRowLine };
