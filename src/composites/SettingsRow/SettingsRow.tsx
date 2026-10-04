/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { HintScope } from '../../primitives/HintScope';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { drawInput } from './behavior/draw-input';
import { lineHints } from './behavior/line-hints';
import { rowClass } from './behavior/row-class';
import { uniqueHints } from './behavior/unique-hints';
import { useRowPointed } from './behavior/useRowPointed';
import { valueHint } from './behavior/value-hint';
import { INPUT_RENDERERS } from './behavior/input-renderers.constants';
import { SettingsRowCompactText } from './sub-components/SettingsRowCompactText';
import { SettingsRowControl } from './sub-components/SettingsRowControl';
import { SettingsRowText } from './sub-components/SettingsRowText';
import { SettingsRowValue } from './sub-components/SettingsRowValue';
import { VALUE_RENDERERS } from './behavior/value-renderers.constants';
import type { SettingsRowProps } from './SettingsRow.type';
import '../../theme/search-hit.css';
import './SettingsRow.css';

const SettingsRow = (props: SettingsRowProps) => {
  const { id, title, description, hint, input, disabled, compact, readOnly } = props;
  const { settings } = useTesseraStrings();
  const { pointed, handlers } = useRowPointed();
  const context = { label: title, disabled: disabled === true, compact: compact === true, strings: settings };
  const rowHint = { label: '', description: hint };
  const whole = readOnly === true ? valueHint(input, settings) ?? rowHint : rowHint;
  const hints = uniqueHints([rowHint, ...(readOnly === true ? [whole] : lineHints(input, settings))]);
  const shown = pointed ? whole : undefined;

  return (
    <HintScope>
      <Box className={rowClass(props)} data-setting-key={id} data-kind={input.kind}>
        {compact === true
          ? <SettingsRowCompactText title={title} description={description} />
          : <SettingsRowText title={title} resting={description ?? hint} hints={hints} pointed={shown} />}
        {readOnly === true
          ? <SettingsRowValue handlers={handlers}>{drawInput(VALUE_RENDERERS, input, context)}</SettingsRowValue>
          : <SettingsRowControl bubble={compact === true} handlers={handlers} pointed={shown}>{drawInput(INPUT_RENDERERS, input, context)}</SettingsRowControl>}
      </Box>
    </HintScope>
  );
};

export { SettingsRow };
