/* @layer renderer-components @kind logic */
import type { RestoredView, ViewSnapshot } from './snapshot.type';

const restore = (snapshot: ViewSnapshot): RestoredView => {
  const view: RestoredView = {
    table: {
      columns: snapshot.columns.map((column) => ({ ...column })),
      sort: snapshot.sort.map((entry) => ({ ...entry })),
      groupBy: [...snapshot.groupBy],
    },
    filters: snapshot.filters.map((clause) => ({ ...clause })),
  };
  if (snapshot.tab !== undefined) view.tab = snapshot.tab;
  if (snapshot.collapsed !== undefined) view.collapsed = snapshot.collapsed;
  return view;
};

export { restore };
