/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import type { ReorderTogglesProps } from '../ReorderList.type';
import './ReorderToggles.css';

const ReorderToggles = ({ name, toggles, state, onToggle }: ReorderTogglesProps) => (
  <Box role="group" aria-label={name} className="reorder-list__toggles" data-reorder-toggles>
    {toggles.map((toggle) => {
      const on = state?.[toggle.id] ?? false;
      return (
        <IconButton
          key={toggle.id}
          variant="ghost"
          size="sm"
          label={toggle.label}
          aria-pressed={on}
          className="reorder-list__toggle"
          data-on={on ? 'yes' : 'no'}
          onClick={() => onToggle(toggle.id, !on)}
        >
          <Icon name={on ? toggle.iconOn : toggle.iconOff} size={16} />
        </IconButton>
      );
    })}
  </Box>
);

export { ReorderToggles };
