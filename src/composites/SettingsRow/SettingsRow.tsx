/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { HintScope } from '../../primitives/HintScope';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { rowClass } from './behavior/row-class';
import { rowData } from './behavior/row-data';
import { rowHints } from './behavior/row-hints';
import { useRowPointed } from './behavior/useRowPointed';
import { SettingsRowCompactText } from './sub-components/SettingsRowCompactText';
import { SettingsRowEnd } from './sub-components/SettingsRowEnd';
import { SettingsRowInput } from './sub-components/SettingsRowInput';
import { SettingsRowProblem } from './sub-components/SettingsRowProblem';
import { SettingsRowText } from './sub-components/SettingsRowText';
import type { SettingsRowProps } from './SettingsRow.type';
import '../../theme/search-hit.css';
import './SettingsRow.css';

const SettingsRow = (props: SettingsRowProps) => {
  const { title, description, descriptionLines, input, disabled = false, compact = false, readOnly = false, badge, changed, problem } = props;
  const { settings } = useTesseraStrings();
  const { pointed, handlers } = useRowPointed();
  const context = { label: title, disabled, compact, strings: settings };
  const { resting, hints, whole } = rowHints(props, settings);
  const shown = pointed ? whole : undefined;
  const head = { title, badge, changed, onReset: readOnly ? undefined : props.onReset };

  return (
    <HintScope>
      <Box className={rowClass(props)} {...rowData(props)}>
        {compact
          ? <SettingsRowCompactText {...head} description={description} />
          : <SettingsRowText {...head} description={description} descriptionLines={descriptionLines} resting={resting} hints={hints} pointed={shown} />}
        <SettingsRowEnd actions={readOnly ? undefined : props.actions} disabled={disabled}>
          <SettingsRowInput input={input} readOnly={readOnly} context={context} handlers={handlers} pointed={shown} />
        </SettingsRowEnd>
        {problem != null && <SettingsRowProblem problem={problem} />}
      </Box>
    </HintScope>
  );
};

export { SettingsRow };
