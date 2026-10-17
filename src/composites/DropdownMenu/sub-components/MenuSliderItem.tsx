/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Slider } from '../../../primitives/Slider';
import { Span } from '../../../primitives/text-elements';
import { SLIDER_OWN_KEYS } from '../DropdownMenu.constants';
import { MenuIcon } from './MenuIcon';
import { MenuMark } from './MenuMark';
import type { MenuEntryProps } from './MenuEntry.type';

const keepOwnKeys = (event: KeyboardEvent<HTMLElement>): void => {
  if (SLIDER_OWN_KEYS.includes(event.key)) event.stopPropagation();
};

const MenuSliderItem = (props: MenuEntryProps) => {
  const { item } = props;
  const { min = 0, max = 100, step = 1, value = min } = item;

  return (
    <Box className="dropdown__item dropdown__slider" onKeyDown={keepOwnKeys}>
      <MenuMark kind="slider" checked={false} />
      <MenuIcon icon={item.icon} />
      <Span className="dropdown__label">{item.label}</Span>
      <Slider
        className="dropdown__slider-track"
        size="sm"
        value={value}
        min={min}
        max={max}
        step={step}
        formatValue={item.formatValue}
        disabled={item.disabled}
        aria-label={item.label}
        onChange={item.onChange}
      />
    </Box>
  );
};

export { MenuSliderItem };
