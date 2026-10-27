/* @layer renderer-components @kind component */
import { itemKind } from '../behavior/item-kind';
import { MenuItemButton } from './MenuItemButton';
import { MenuSelectItem } from './MenuSelectItem';
import { MenuSliderItem } from './MenuSliderItem';
import type { MenuResultsProps } from './MenuResults.type';

const MenuResults = (props: MenuResultsProps) => (
  <>
    {props.matches.map((match) => {
      const key = [...match.path, match.item.id].join('/');
      if (itemKind(match.item) === 'slider') return <MenuSliderItem key={key} item={match.item} />;
      if (itemKind(match.item) === 'select') return <MenuSelectItem key={key} item={match.item} />;
      return <MenuItemButton key={key} item={match.item} path={match.path} query={props.query} />;
    })}
  </>
);

export { MenuResults };
