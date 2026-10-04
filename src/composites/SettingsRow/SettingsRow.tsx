/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { HintScope } from '../../primitives/HintScope';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { drawInput } from './behavior/draw-input';
import { rowClass } from './behavior/row-class';
import { rowHints } from './behavior/row-hints';
import { useRowPointed } from './behavior/useRowPointed';
import { INPUT_RENDERERS } from './behavior/input-renderers.constants';
import { SettingsRowCompactText } from './sub-components/SettingsRowCompactText';
import { SettingsRowControl } from './sub-components/SettingsRowControl';
import { SettingsRowProblem } from './sub-components/SettingsRowProblem';
import { SettingsRowText } from './sub-components/SettingsRowText';
import { SettingsRowValue } from './sub-components/SettingsRowValue';
import { VALUE_RENDERERS } from './behavior/value-renderers.constants';
import type { SettingsRowProps } from './SettingsRow.type';
import '../../theme/search-hit.css';
import './SettingsRow.css';

const SettingsRow = (props: SettingsRowProps) => {
  const { id, title, description, descriptionLines, input, disabled, compact, readOnly, badge, changed, problem } = props;
  const { settings } = useTesseraStrings();
  const { pointed, handlers } = useRowPointed();
  const context = { label: title, disabled: disabled === true, compact: compact === true, strings: settings };
  const { resting, hints, whole } = rowHints(props, settings);
  const shown = pointed ? whole : undefined;
  const head = { title, badge, changed, onReset: readOnly === true ? undefined : props.onReset };

  return (
    <HintScope>
      <Box className={rowClass(props)} data-setting-key={id} data-kind={input.kind} data-changed={changed === true || undefined}>
        {compact === true
          ? <SettingsRowCompactText {...head} description={description} />
          : <SettingsRowText {...head} description={description} descriptionLines={descriptionLines} resting={resting} hints={hints} pointed={shown} />}
        {readOnly === true
          ? <SettingsRowValue handlers={handlers}>{drawInput(VALUE_RENDERERS, input, context)}</SettingsRowValue>
          : <SettingsRowControl bubble={compact === true} handlers={handlers} pointed={shown}>{drawInput(INPUT_RENDERERS, input, context)}</SettingsRowControl>}
        {problem != null && <SettingsRowProblem problem={problem} />}
      </Box>
    </HintScope>
  );
};

export { SettingsRow };
