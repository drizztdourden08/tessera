/* @layer renderer-components @kind logic */
import type { SideNavSearch } from '../../SideNav';
import type { WorkspaceSearch } from '../WorkspaceScreen.type';

const navSearchOf = (search: WorkspaceSearch | false | undefined, query: string, setQuery: (query: string) => void, fallback: string): SideNavSearch | undefined =>
  (search === false ? undefined : { value: query, onChange: setQuery, placeholder: search?.placeholder ?? fallback });

export { navSearchOf };
