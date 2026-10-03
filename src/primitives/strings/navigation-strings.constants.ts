/* @layer renderer-components @kind data */
const NAVIGATION_STRINGS = {
  sections: 'Sections',
  menu: 'Menu',
  collapseNavigation: 'Collapse navigation',
  expandNavigation: 'Expand navigation',
  clearSearch: 'Clear search',
  commandPlaceholder: 'Search screens, settings and actions',
  noResultsFor: (query: string) => `No results for "${query}"`,
  resultsFor: (count: number, query: string) => `${count} ${count === 1 ? 'result' : 'results'} for "${query}"`,
  searchResults: 'Search results',
  searchTip: 'Try a shorter word, or another name.',
  typeToSearch: 'Type to search.',
  openPage: 'Open page',
  openNamed: (name: string) => `Open ${name}`,
  firstPane: 'first pane',
  secondPane: 'second pane',
  showPane: (pane: string) => `Show ${pane}`,
  resizePanes: (start: string, end: string) => `Resize ${start} and ${end}`,
  resizeHint: 'Drag to resize · double-click to reset',
  pageViews: (title: string) => `${title} views`,
  pageSections: (title: string) => `${title} sections`,
  opensInNewTab: 'opens in a new tab',
};

export { NAVIGATION_STRINGS };
