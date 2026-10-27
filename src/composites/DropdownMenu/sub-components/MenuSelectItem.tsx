/* @layer renderer-components @kind component */
import { useContext } from 'react';
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Select } from '../../../primitives/Select';
import { Span } from '../../../primitives/text-elements';
import { MenuKeysContext } from '../behavior/menu-keys-context';
import { MenuIcon } from './MenuIcon';
import { MenuMark } from './MenuMark';
import type { MenuEntryProps } from './MenuEntry.type';

const MenuSelectItem = (props: MenuEntryProps) => {
  const { item } = props;
  const menuKeys = useContext(MenuKeysContext);
  const walkMenu = (event: KeyboardEvent<HTMLElement>): void => {
    if ((event.target as HTMLElement).getAttribute('aria-expanded') === 'false') menuKeys(event);
  };

  return (
    <Box {...item.data} aria-description={item.ariaDescription} className="dropdown__item dropdown__select" onKeyDownCapture={walkMenu}>
      <MenuMark kind="select" checked={false} />
      <MenuIcon icon={item.icon} />
      <Span className="dropdown__label">{item.label}</Span>
      <Select
        className="dropdown__select-field"
        size="sm"
        options={item.options ?? []}
        value={item.selected}
        disabled={item.disabled}
        aria-label={item.label}
        onChange={item.onPick}
      />
    </Box>
  );
};

export { MenuSelectItem };
