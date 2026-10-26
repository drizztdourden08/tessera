/* @layer renderer-components @kind data */
const DOCUMENT_TABS_STRINGS = {
  label: 'Open documents',
  close: (title: string) => `Close ${title}`,
  unsaved: 'Unsaved changes',
  add: 'New document',
  menu: 'All open documents',
  moved: (title: string, position: number, total: number) => `${title} moved to position ${position} of ${total}`,
  keysHint: 'Left and Right move focus. Delete or Ctrl and W closes the tab. Alt with Left or Right moves it.',
};

export { DOCUMENT_TABS_STRINGS };
