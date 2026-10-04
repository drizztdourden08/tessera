/* @layer renderer-components @kind component */
import { Select } from '../../../../../primitives/Select';
import { useTesseraStrings } from '../../../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { groupOptions } from '../behavior/group-options';
import { NO_GROUP } from '../WidgetOptions.constants';
import type { GroupRowProps } from '../WidgetOptions.type';
import { OptionRow } from './OptionRow';

const GroupRow = (props: GroupRowProps) => {
  const { group, groups, onGroupChange } = props;
  const { widgets } = useTesseraStrings();
  const options = groupOptions(groups, widgets);
  const chosen = options.find((option) => option.value === group);
  const hint = chosen
    ? { label: chosen.label, description: widgets.groupJoinHint(chosen.label) }
    : { label: widgets.groupNone, description: widgets.groupNoneHint };
  return (
    <OptionRow label={widgets.group} about={widgets.groupAbout} hint={hint}>
      <Select
        size="sm"
        className="widget-option-row__select"
        aria-label={widgets.group}
        options={options}
        value={chosen?.value ?? NO_GROUP}
        onChange={(next) => onGroupChange(next === NO_GROUP ? null : next)}
      />
    </OptionRow>
  );
};

export { GroupRow };
