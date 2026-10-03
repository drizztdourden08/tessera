/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { HintScope } from '../../primitives/HintScope';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../primitives/text-elements';
import { drawInput } from './behavior/draw-input';
import { hasPartHints } from './behavior/has-part-hints';
import { rowClass } from './behavior/row-class';
import { valueHint } from './behavior/value-hint';
import { INPUT_RENDERERS } from './behavior/input-renderers.constants';
import { SettingsRowCompactText } from './sub-components/SettingsRowCompactText';
import { SettingsRowControl } from './sub-components/SettingsRowControl';
import { SettingsRowText } from './sub-components/SettingsRowText';
import { VALUE_RENDERERS } from './behavior/value-renderers.constants';
import type { SettingsRowProps } from './SettingsRow.type';
import '../../theme/search-hit.css';
import './SettingsRow.css';

const SettingsRow = (props: SettingsRowProps) => {
  const { id, title, description, hint, input, disabled, compact, readOnly } = props;
  const { settings } = useTesseraStrings();
  const context = { label: title, disabled: disabled === true, strings: settings };
  const current = valueHint(input, settings);
  const hintLine = readOnly === true ? current !== undefined || hint !== undefined : hint !== undefined || hasPartHints(input);

  return (
    <HintScope>
      <Box className={rowClass(props)} data-setting-key={id} data-kind={input.kind}>
        {compact === true
          ? <SettingsRowCompactText title={title} description={description} />
          : <SettingsRowText title={title} description={description} hintLine={hintLine} hint={hint} current={current} />}
        {readOnly === true
          ? <Span className="settings-row__value">{drawInput(VALUE_RENDERERS, input, context)}</Span>
          : <SettingsRowControl bubble={compact === true} current={current}>{drawInput(INPUT_RENDERERS, input, context)}</SettingsRowControl>}
      </Box>
    </HintScope>
  );
};

export { SettingsRow };
