/* @layer renderer-components @kind component */
import { MenuItemButton } from './MenuItemButton';
import type { MenuResultsProps } from './MenuResults.type';

const MenuResults = (props: MenuResultsProps) => (
  <>
    {props.matches.map((match) => (
      <MenuItemButton key={[...match.path, match.item.id].join('/')} item={match.item} path={match.path} query={props.query} />
    ))}
  </>
);

export { MenuResults };
