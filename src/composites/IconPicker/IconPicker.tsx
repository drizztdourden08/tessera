/* @layer renderer-components @kind component */
import { IconButton } from '../../primitives/IconButton';
import { filterIcons } from './behavior/filter-icons';
import { useIconPicker } from './behavior/useIconPicker';
import { IconMark } from './sub-components/IconMark';
import { IconPickerPanel } from './sub-components/IconPickerPanel';
import { ALL_ICON_NAMES } from './IconPicker.constants';
import './IconPicker.css';
import type { IconPickerProps } from './IconPicker.type';

const IconPicker = (props: IconPickerProps) => {
  const { value, onChange, label, icons = ALL_ICON_NAMES, allowUpload = true, disabled = false, className = '' } = props;
  const picker = useIconPicker({ onChange });

  return (
    <>
      <IconButton
        ref={picker.anchorRef}
        label={label}
        variant="secondary"
        disabled={disabled}
        active={picker.open}
        aria-haspopup="dialog"
        aria-expanded={picker.open}
        className={className ? `icon-picker ${className}` : 'icon-picker'}
        onClick={picker.toggle}
      >
        <IconMark value={value} />
      </IconButton>
      {picker.open && (
        <IconPickerPanel
          anchorRef={picker.anchorRef}
          icons={filterIcons(icons, picker.query)}
          selected={value.kind === 'icon' ? value.name : null}
          query={picker.query}
          problem={picker.problem}
          allowUpload={allowUpload}
          onQuery={picker.setQuery}
          onPick={picker.pickIcon}
          onUpload={picker.upload}
          onClose={picker.close}
        />
      )}
    </>
  );
};

export { IconPicker };
