/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useHint } from '../../../primitives/hint/useHint';
import { Small } from '../../../primitives/text-elements';
import { SettingsRowHintText } from './SettingsRowHintText';
import type { SettingsRowLineProps } from './SettingsRowLine.type';

const SettingsRowLine = (props: SettingsRowLineProps) => {
  const { resting, hints, pointed } = props;
  const shown = useHint() ?? pointed;

  return (
    <Box className="settings-row__line" data-pointed={shown === undefined ? undefined : true}>
      <Small tone="dim" className="settings-row__description">{resting}</Small>
      <Small className="settings-row__hint" role="status" aria-live="polite">
        {shown !== undefined && <SettingsRowHintText hint={shown} />}
      </Small>
      {hints.map((hint) => (
        <Small key={`${hint.label} ${hint.description}`} className="settings-row__sizer" aria-hidden>
          <SettingsRowHintText hint={hint} />
        </Small>
      ))}
    </Box>
  );
};

export { SettingsRowLine };
